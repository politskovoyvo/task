import { Document } from 'mongoose';
import { Base, Priority, SpendTime } from '../dto/task.dto';
export declare type TaskDocument = TaskEntity & Document;
export declare class TaskEntity {
    id: number;
    type: string;
    color: string;
    symbol: string;
    priority: Priority[];
    assignee: Base;
    performers: Base[];
    spendTime: string;
    history: History[];
    info?: string;
    histories: SpendTime[];
}
export declare const TaskSchema: import("mongoose").Schema<Document<TaskEntity>, import("mongoose").Model<Document<TaskEntity>>, undefined>;
