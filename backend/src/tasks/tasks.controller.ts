import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskDocument, TaskEntity } from './schemas/task.schema';
import { Model } from 'mongoose';
import { TaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    @InjectModel(TaskEntity.name) private _taskDB: Model<TaskDocument>,
  ) {}

  @Get()
  async getTasks(@Query('id') parentId?: number) {
    if (!parentId) {
      return await this._taskDB.find().exec();
    }
    return await this._taskDB.find().exec();
  }

  @Post('add')
  async createTask(@Body() taskDto: TaskDto): Promise<TaskEntity> {
    return await new this._taskDB(taskDto).save();
  }

  @Post(':id')
  async removeTask(@Param('id') id): Promise<void> {
    await this._taskDB.remove(id);
  }

  @Post(':id')
  async gets(@Param('id') id): Promise<void> {
    await this._taskDB.remove(id);
  }
}
