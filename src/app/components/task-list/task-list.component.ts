import { Component, Input, OnInit } from '@angular/core';
import { IAppState } from '@core/stores/app.state';
import { GetTask } from '@core/stores/task/task.actions';
import { Store } from '@ngrx/store';
import { Task } from '@share/models/task';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
    @Input() tasks: Task[];

    constructor(private taskStore$: Store<IAppState>) {}

    ngOnInit(): void {

    }

    selected(taskId: number) {
      this.taskStore$.dispatch(new GetTask(taskId))
    }
}
