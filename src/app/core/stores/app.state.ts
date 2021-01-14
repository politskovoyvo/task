import { RouterReducerState } from '@ngrx/router-store';
import { initialTaskState, ITaskState } from './task/task.state';

export interface IAppState {
  router?: RouterReducerState;
  tasks: ITaskState;
}

export const initialAppState: IAppState = {
  tasks: initialTaskState,
};

export const getInitialState = (): IAppState => initialAppState;
