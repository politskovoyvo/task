import { Component, Input, OnInit } from '@angular/core';
import { TaskCardComponent } from '@components/task-card/task-card.component';
import { IAppState } from '@core/stores/app.state';
import { GetTask } from '@core/stores/task/task.actions';
import { select, Store } from '@ngrx/store';
import { Task } from '@share/models/task';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { selectedTasks } from '@core/stores/task/task.selectors';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    providers: [NzDrawerService],
})
export class TaskListComponent implements OnInit {
    tasks$ = this._taskStore$.pipe(select(selectedTasks));

    constructor(
        private _taskStore$: Store<IAppState>,
        private _drawerService: NzDrawerService
    ) {}

    ngOnInit(): void {}

    openTask(task: Task) {
        this.selected(task.id);
        this._drawerService.create({
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
