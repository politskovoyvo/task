import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { TaskCoreService } from '@core/services/task-core.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SpendTime } from '@share/models/spend-time';
import { Observable } from 'rxjs';
import { historyType, IHistory, TaskHistory } from './plagins/task-history';

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
    _storeHistory$: Observable<IHistory[]>;

    @Input() set spendTimes(spendTimes: SpendTime[]) {
        this._taskHistory = new TaskHistory(spendTimes);
        this._storeHistory$ = this._taskHistory.selectedStore$();
    }

    userId = this._authService.user.id;

    isEdit() {}

    constructor(
        private _taskCoreService: TaskCoreService,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {}

    getTypeIcon(type: historyType) {
        if (type === 'spendTime') return 'field-time';
        if (type === 'message') return 'message';
    }

    add() {
        //TODO: новое время в форме
        const spendTime: SpendTime = {} as SpendTime;

        this._taskCoreService
            .addSpendTime(this.taskId, spendTime.perfomer.id, spendTime.spendTime)
            .pipe(untilDestroyed(this))
            .subscribe();
    }

    edit(type: HTMLElement) {
        type['isEdit'] = !type['isEdit'];
    }

    save(type: HTMLElement, spendTime: SpendTime) {}

    remove(spendTime: SpendTime) {
        this._taskCoreService
            .removeSpendTime(spendTime.id)
            .pipe(untilDestroyed(this))
            .subscribe();
    }
}
