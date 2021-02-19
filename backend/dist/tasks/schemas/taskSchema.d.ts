import { Document } from 'mongoose';
export declare type TaskDocument = TaskEntity & Document;
export declare class TaskEntity {
    id: number;
    type: string;
}
export declare const TaskSchema: import("mongoose").Schema<Document<TaskEntity>, import("mongoose").Model<Document<TaskEntity>>, undefined>;
