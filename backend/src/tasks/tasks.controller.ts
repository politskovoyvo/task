import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { TasksService } from './tasks.service';
import { TaskEntity } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private _taskService: TasksService) {}

    //
    @Get()
    async getTasks(@Query('id') parentId?: number) {
        return await this._taskService.getAll();
    }

    //
    @Post('add')
    async createTask(@Body() task: TaskDto): Promise<TaskEntity> {
        console.log(task);
        return this._taskService.create(task);
    }

    //
    // @Post('remove/:id')
    // async removeTask(@Param('id') id): Promise<any> {
    //   return await this._taskDB.collection.name;
    // }
    //
    // // @Post(':id')
    // // async gets(@Param('id') id): Promise<void> {
    // //   await this._taskDB.remove(id);
    // // }
}
