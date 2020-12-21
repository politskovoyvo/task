import { Base } from './base';
import { IntervalDate } from './interval-date';

interface TaskHistory extends IntervalDate  {
    tipeId: number; // id типа таска (например Release, feature  и тд)
}

export interface Task extends Base {
    type: string;
    simbol: string;
    priority: string;
    assignee: Base[];
    interval: IntervalDate;
    history: TaskHistory[]; // массив событий
}