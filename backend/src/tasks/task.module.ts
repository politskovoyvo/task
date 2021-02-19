import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TaskDb, TaskSchema } from './schemas/task.schema';

@Module({
  controllers: [TasksController],
  imports: [
    MongooseModule.forFeature([
      {
        name: TaskDb.name,
        schema: TaskSchema,
      },
    ]),
  ],
  providers: [TasksService],
})
export class TaskModule {}
