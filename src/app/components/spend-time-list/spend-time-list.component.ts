import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { TaskCoreService } from '@core/services/task-core.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SpendTime } from '@share/models/spend-time';

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

    @Input() set spendTimes(spendTimes: SpendTime[]) {
        this._spendTimes = spendTimes.map((sp) => ({ ...sp }));
    }

    userId = this._authService.user.id;

    isEdit() {}

    constructor(
        private _taskCoreService: TaskCoreService,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {}

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
