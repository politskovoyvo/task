import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskDocument, TaskDb } from './schemas/task.schema';
import { Model } from 'mongoose';
import { TaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(@InjectModel(TaskDb.name) private _taskDB: Model<TaskDocument>) {}

  @Get()
  async getTasks(@Query('id') parentId?: number) {
    if (!parentId) {
      return this._taskDB.find().exec();
    }
    return this._taskDB.find().exec();
  }

  @Post('add')
  async createTask(@Body() taskDto: TaskDto): Promise<TaskDb> {
    return new this._taskDB(taskDto).save();
  }

  @Post('remove/:id')
  async removeTask(@Param('id') id): Promise<any> {
    return await this._taskDB.collection.name;
  }

  // @Post(':id')
  // async gets(@Param('id') id): Promise<void> {
  //   await this._taskDB.remove(id);
  // }
}
