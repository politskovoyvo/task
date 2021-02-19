import { TaskDocument, TaskEntity } from './schemas/task.schema';
import { Model } from 'mongoose';
import { TaskDto } from './dto/task.dto';
export declare class TasksController {
    private _taskDB;
    constructor(_taskDB: Model<TaskDocument>);
    getTasks(parentId?: number): Promise<TaskDocument[]>;
    createTask(taskDto: TaskDto): Promise<TaskEntity>;
    removeTask(id: any): Promise<void>;
    gets(id: any): Promise<void>;
}
