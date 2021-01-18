import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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
    @Input() spendTimes: SpendTime[];
    @Input() taskId: number;

    constructor(private _taskCoreService: TaskCoreService) {}

    ngOnInit(): void {}

    add() {
        //TODO: новое время в форме
        const spendTime: SpendTime = {} as SpendTime;

        this._taskCoreService
            .addSpendTime(this.taskId, spendTime.perfomer.id, spendTime.spendTime)
            .pipe(untilDestroyed(this))
            .subscribe();
    }

    edit(spendTime: SpendTime) {
        this._taskCoreService
            .editSpendTime(spendTime.id, spendTime.perfomer.id, spendTime.spendTime)
            .pipe(untilDestroyed(this))
            .subscribe();
    }

    remove(spendTime: SpendTime) {
        this._taskCoreService
            .removeSpendTime(spendTime.id)
            .pipe(untilDestroyed(this))
            .subscribe();
    }
}
