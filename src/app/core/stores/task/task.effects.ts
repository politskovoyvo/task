import { Injectable } from '@angular/core';
import { BoardCoreService } from '@core/services/board-core.service';
import { TaskCoreService } from '@core/services/task-core.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Task } from '@share/models/task';
import { forkJoin, of } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { IAppState } from '../app.state';
import {
    CreateTask,
    EditTask,
    GetTask,
    GetTasks,
    GetTasksSuccess,
    GetTaskSuccess,
    RemoveTask,
    TaskActionsType,
} from './task.actions';
import { selectedTask, selectedTasks } from './task.selectors';

@Injectable()
export class TaskEffects {
    @Effect()
    getTask$ = this._actions$.pipe(
        ofType<GetTask>(TaskActionsType.GetTask),
        map((action) => action.payload),
        withLatestFrom(this._store.pipe(select(selectedTasks))),
        switchMap(([id, tasks]: [number, Task[]]) => {
            const selectTask = tasks.find((task: Task) => task.id === +id);
            return of(new GetTaskSuccess(selectTask));
        })
    );

    @Effect()
    getTasks$ = this._actions$.pipe(
        ofType<GetTasks>(TaskActionsType.GetTasks),
        switchMap(() =>
            this._taskCoreService.getTasks(this._boardCoreService.currentBoard.id)
        ),
        withLatestFrom(this._store.pipe(select(selectedTask))),
        switchMap(([tasks, task]) => {
            if (!task) {
                return of(tasks);
            }
            const selectTask = tasks.find((t: Task) => t.id === task.id);
            this._store.dispatch(new GetTaskSuccess(selectTask));
            return of(tasks);
        }),
        switchMap((tasks) => of(new GetTasksSuccess(tasks)))
        // TODO: обновить выбранный GETTASK
    );

    @Effect()
    createTask$ = this._actions$.pipe(
        ofType<CreateTask>(TaskActionsType.CreateTask),
        map((action) => action.payload),
        switchMap((task) =>
            this._taskCoreService.createTask(this._boardCoreService.currentBoard.id, task)
        ),
        switchMap(() => of(new GetTasks()))
    );

    @Effect()
    editTask$ = this._actions$.pipe(
        ofType<EditTask>(TaskActionsType.EditTask),
        map((action) => action.payload),
        switchMap((task: Task) => this._taskCoreService.editTask(task)),
        switchMap(() => of(new GetTasks()))
    );

    @Effect()
    removeTask$ = this._actions$.pipe(
        ofType<RemoveTask>(TaskActionsType.RemoveTask),
        map((action) => action.payload),
        switchMap((taskId: number) => this._taskCoreService.removeTask(taskId)),
        switchMap(() => of(new GetTasks()))
    );

    constructor(
        private _actions$: Actions,
        private _store: Store<IAppState>,
        private _taskCoreService: TaskCoreService,
        private _boardCoreService: BoardCoreService
    ) {}
}
