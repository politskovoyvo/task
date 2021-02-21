import { TaskEntity } from './entities/task.entity';

export const TASK_REPOSITORY = 'USER_REPOSITORY';

export const taskProviders = [
  {
    provide: TASK_REPOSITORY,
    useValue: TaskEntity,
  },
];
