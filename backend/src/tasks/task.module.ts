import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { taskProviders } from './task.provider';

@Module({
  controllers: [TasksController],
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: TaskDb.name,
    //     schema: TaskSchema,
    //   },
    // ]),
  ],
  exports: [TasksService],
  providers: [TasksService, ...taskProviders],
})
export class TaskModule {}
