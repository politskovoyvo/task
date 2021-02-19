/// <reference types="mongoose" />
export declare class PriorityEntity {
    id: number;
    name: string;
    color: string;
}
export declare const PrioritySchema: import("mongoose").Schema<import("mongoose").Document<PriorityEntity>, import("mongoose").Model<import("mongoose").Document<PriorityEntity>>, undefined>;
