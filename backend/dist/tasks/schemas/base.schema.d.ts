import { Document } from 'mongoose';
export declare class BaseEntity extends Document {
    id: number;
    name: string;
}
export declare const BaseSchema: import("mongoose").Schema<BaseEntity, import("mongoose").Model<BaseEntity>, undefined>;
