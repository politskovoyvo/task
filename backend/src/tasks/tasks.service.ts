import { Inject, Injectable } from '@nestjs/common';
import { TASK_REPOSITORY } from './task.provider';
import { TaskEntity } from './entities/task.entity';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly _taskRepository: typeof TaskEntity,
  ) {}

  async create(task: TaskDto): Promise<TaskEntity> {
    // @ts-ignore
    return await this._taskRepository.create<TaskEntity>(task);
  }

  async getAll(): Promise<TaskEntity[]> {
    return this._taskRepository.findAll<TaskEntity>();
  }
}
