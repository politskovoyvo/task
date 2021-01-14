import { Task } from '@share/models/task';

export interface ITaskState {
  tasks: Task[];
  selectedTask: Task;
}
export const initialTaskState: ITaskState = {
  tasks: null,
  selectedTask: null,
};
