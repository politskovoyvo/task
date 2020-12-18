import { Base } from './base';
import { IntervalDate } from './interval-date';

interface TaskHistory extends IntervalDate  {
    start: string;
}

export interface Task extends Base, IntervalDate {
    type: string;
    simbol: string;
    priority: string;
    assignee: Base[];
    history: TaskHistory[]; // массив событий
}