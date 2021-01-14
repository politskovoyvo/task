import { Injectable } from '@angular/core';
import { BoardCoreService } from '@core/services/board-core.service';
import { TaskCoreService } from '@core/services/task-core.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Task } from '@share/models/task';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { IAppState } from '../app.state';
import { GetTask, GetTasks, GetTaskSuccess, TaskActionsType } from './task.actions';
import { selectedTask, selectedTasks } from './task.selectors';
import { ITaskState } from './task.state';

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
        switchMap(() => this._taskCoreService.getTasks(this._boardCoreService.currentBoard.id))
    );

    constructor(
        private _actions$: Actions,
        private _store: Store<IAppState>,
        private _taskCoreService: TaskCoreService,
        private _boardCoreService: BoardCoreService
    ) {}
}
