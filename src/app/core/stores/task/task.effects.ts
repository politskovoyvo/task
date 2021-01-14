import { Injectable } from '@angular/core';
import { BoardCoreService } from '@core/services/board-core.service';
import { TaskCoreService } from '@core/services/task-core.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Task } from '@share/models/task';
import { of } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { IAppState } from '../app.state';
import {
    CreateTask,
    GetTask,
    GetTasks,
    GetTasksSuccess,
    GetTaskSuccess,
    TaskActionsType,
} from './task.actions';
import { selectedTasks } from './task.selectors';

@Injectable()
export class TaskEffects {
    @Effect()
    getTask$ = this._actions$.pipe(
        ofType<GetTask>(TaskActionsType.GetTask),
        map((action) => action.payload),
        withLatestFrom(this._store.pipe(select(selectedTasks))),
        switchMap(([id, tasks]: [number, Task[]]) => {
            const selectedTask = tasks.find((task: Task) => task.id === +id);
            return of(new GetTaskSuccess(selectedTask));
        })
    );

    @Effect()
    getTasks$ = this._actions$.pipe(
        ofType<GetTasks>(TaskActionsType.GetTasks),
        switchMap(() =>
            this._taskCoreService.getTasks(this._boardCoreService.currentBoard.id)
        ),
        switchMap((tasks: Task[]) => of(new GetTasksSuccess(tasks)))
    );

    @Effect()
    createTask$ = this._actions$.pipe(
        ofType<CreateTask>(TaskActionsType.CreateTask),
        map((action) => action.payload),
        switchMap((task) =>
            this._taskCoreService.createTask(this._boardCoreService.currentBoard.id, task)
        ),
        switchMap((tasks: Task[]) => of(new GetTasks()))
    );

    constructor(
        private _actions$: Actions,
        private _store: Store<IAppState>,
        private _taskCoreService: TaskCoreService,
        private _boardCoreService: BoardCoreService
    ) {}
}
