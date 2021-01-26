import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { TaskCoreService } from '@core/services/task-core.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SpendTime } from '@share/models/spend-time';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { historyType, IHistory, IHistoryItem, TaskHistory } from './plagins/task-history';

@UntilDestroy()
@Component({
    selector: 'app-spend-time-list',
    templateUrl: './spend-time-list.component.html',
    styleUrls: ['./spend-time-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpendTimeListComponent implements OnInit {
    @Input() taskId: number;

    _spendTimes: SpendTime[];
    _taskHistory: TaskHistory;
    userId = this._authService.user.id;

    _storeHistory$: Observable<IHistory[]>;

    @Input() set spendTimes(spendTimes: SpendTime[]) {
        this._taskHistory = new TaskHistory(spendTimes);
        this._storeHistory$ = this._taskHistory.selectedStore$();
    }

    constructor(
        private _taskCoreService: TaskCoreService,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {}

    getTypeIcon(type: historyType) {
        switch (type) {
            case 'message':
                return 'message';
            case 'spendTime':
                return 'field-time';
        }
    }

    mouseEnter(htmlElement: HTMLElement, userId?: number) {
        if (!userId && this.userId !== userId) {
            return;
        }
        htmlElement['isEdit'] = true;
    }

    mouseLeave(htmlElement: HTMLElement) {
        htmlElement['isEdit'] = false;
    }

    edit(history: IHistoryItem, type: historyType) {
        // TODO: http запрос на изменение
        Object.assign(history.cash, { ...history, type });
        this.toEditTemplate(history, type);
    }

    cancel(history: IHistoryItem) {
        Object.assign(history, history.cash);
    }

    add() {
        //TODO: новое время в форме
        const spendTime: SpendTime = {} as SpendTime;

        this._taskCoreService
            .addSpendTime(this.taskId, spendTime.perfomer.id, spendTime.spendTime)
            .pipe(untilDestroyed(this))
            .subscribe();
    }

    toEditTemplate(historyItem: IHistoryItem, type: historyType) {
        historyItem.type = type;
    }

    remove(spendTime: SpendTime) {
        this._taskCoreService
            .removeSpendTime(spendTime.id)
            .pipe(untilDestroyed(this))
            .subscribe();
    }
}
