import { Component, Input, OnInit } from '@angular/core';
import { TaskCardComponent } from '@components/task-card/task-card.component';
import { IAppState } from '@core/stores/app.state';
import { GetTask } from '@core/stores/task/task.actions';
import { Store } from '@ngrx/store';
import { Task } from '@share/models/task';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    providers: [NzDrawerService],
})
export class TaskListComponent implements OnInit {
    @Input() tasks: Task[];

    constructor(
        private _taskStore$: Store<IAppState>,
        private _drawerService: NzDrawerService
    ) {}

    ngOnInit(): void {}

    openTask(task: Task) {
        this._drawerService.create({
            nzTitle: `${task.symbol}-${task.id}`,
            nzWidth: '80%',
            nzContent: TaskCardComponent,
            nzContentParams: {
                task,
                action: 'EDIT',
            },
        });
    }

    selected(taskId: number) {
        this._taskStore$.dispatch(new GetTask(taskId));
    }
}
