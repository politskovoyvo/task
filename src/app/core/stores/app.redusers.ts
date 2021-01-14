import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './app.state';
import { taskReducers } from './task/task.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
    tasks: taskReducers,
    router: routerReducer,
};
