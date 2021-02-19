export interface TaskDto {
    type: string;
    color: string;
    symbol: string;
    priority: Priority;
    assignee: Base;
    performers: Base[];
    spendTime: string;
    history?: History[];
    info?: string;
}
export declare type historyType = 'spendTime' | 'message' | 'update' | 'spendTimeEDIT' | 'messageEDIT' | 'updateEDIT';
export interface SpendTime {
    id: number;
    perfomer: Base;
    message: string;
    date: Date;
    type: historyType;
    spendTime?: string;
}
interface History extends IntervalDate {
    trackId: number;
}
export interface IntervalDate {
    startDate: string;
    stopDate: string;
}
export interface Priority extends Base {
    color: string;
}
export interface Base {
    id: number;
    name: string;
}
export {};
