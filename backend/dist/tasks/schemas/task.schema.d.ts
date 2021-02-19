import { Document } from 'mongoose';
import { Base, Priority, SpendTime } from '../dto/task.dto';
export declare type TaskDocument = TaskDb & Document;
export declare class TaskDb {
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
export declare const TaskSchema: import("mongoose").Schema<Document<TaskDb>, import("mongoose").Model<Document<TaskDb>>, undefined>;
