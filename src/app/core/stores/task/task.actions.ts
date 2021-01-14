import { Action } from '@ngrx/store';
import { Task } from '@share/models/task';
import { type } from 'os';

export enum TaskActionsType {
    GetTasks = '[TASK] Get Tasks',
    GetTasksSuccess = '[TASK] Get Tasks Success',
    GetTask = '[TASK] Get Task',
    GetTaskSuccess = '[TASK] Get Task Success',
}

export class GetTasks implements Action {
    public readonly type: TaskActionsType.GetTasks;
}

export class GetTasksSuccess implements Action {
    public readonly type: TaskActionsType.GetTasksSuccess;
    constructor(public payload: Task[]) {}
}

export class GetTask implements Action {
    public readonly type: TaskActionsType.GetTask;
    constructor(public payload: number) {}
}

export class GetTaskSuccess implements Action {
    public readonly type: TaskActionsType.GetTaskSuccess;
    constructor(public payload: Task) {}
}

export type TaskActions = GetTask | GetTaskSuccess | GetTasks | GetTasksSuccess;
