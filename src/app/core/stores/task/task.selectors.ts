import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import { ITaskState } from './task.state';

const selectTasks = (state: IAppState) => state.tasks;

export const selectedTasks = createSelector(
    selectTasks,
    (state: ITaskState) => state.tasks
);

export const selectedTask = createSelector(
    selectTasks,
    (state: ITaskState) => state.selectedTask
);
