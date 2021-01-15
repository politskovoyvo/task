import { Action } from '@ngrx/store';
import { Task } from '@share/models/task';

export enum TaskActionsType {
    GetTasks = '[TASK] Get Tasks',
    GetTasksSuccess = '[TASK] Get Tasks Success',
    GetTask = '[TASK] Get Task',
    GetTaskSuccess = '[TASK] Get Task Success',
    CreateTask = '[TASK] Create Task',
    EditTask = '[TASK] Edit Task',
    RemoveTask = '[TASK] Remove Task',
}

export class GetTasks implements Action {
    public readonly type = TaskActionsType.GetTasks;
}

export class GetTasksSuccess implements Action {
    public readonly type = TaskActionsType.GetTasksSuccess;
    constructor(public payload: Task[]) {}
}

export class GetTask implements Action {
    public readonly type = TaskActionsType.GetTask;
    constructor(public payload: number) {}
}

export class GetTaskSuccess implements Action {
    public readonly type = TaskActionsType.GetTaskSuccess;
    constructor(public payload: Task) {}
}

export class CreateTask implements Action {
    public readonly type = TaskActionsType.CreateTask;
    constructor(public payload: Task) {}
}

export class EditTask implements Action {
    public readonly type = TaskActionsType.EditTask;
    constructor(public payload: Task) {}
}

export class RemoveTask implements Action {
    public readonly type = TaskActionsType.RemoveTask;
    constructor(public payload: number) {}
}

export type TaskActions =
    | GetTask
    | GetTaskSuccess
    | GetTasks
    | GetTasksSuccess
    | CreateTask;
