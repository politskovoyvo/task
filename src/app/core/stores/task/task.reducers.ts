import { initialTaskState, ITaskState } from './task.state';
import { TaskActions, TaskActionsType } from './task.actions';

export const taskReducers = (
    state = initialTaskState,
    action: TaskActions
): ITaskState => {
    switch (action.type) {
        case TaskActionsType.GetTaskSuccess:
            return {
                ...state,
                selectedTask: action.payload,
            };
        case TaskActionsType.GetTasksSuccess:
            return {
                ...state,
                tasks: action.payload,
            };
        default:
            return state;
    }
};
