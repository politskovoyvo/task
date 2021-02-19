import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TaskEntity, TaskSchema } from './schemas/task.schema';
import { BaseEntity, BaseSchema } from './schemas/base.schema';

@Module({
  controllers: [TasksController],
  imports: [
    MongooseModule.forFeature([
      {
        name: TaskEntity.name,
        schema: TaskSchema,
      },
      // {
      //   name: BaseEntity.name,
      //   schema: BaseSchema,
      // },
    ]),
  ],
  providers: [TasksService],
})
export class TaskModule {}
