import { Base } from './base';
import { IntervalDate } from './interval-date';

interface TaskHistory extends IntervalDate  {
    position: number; // id типа таска (например Release, feature  и тд)
}

export interface Task extends Base {
    type: string;
    color: string;
    simbol: string;
    priority: string;
    assignee: Base[];
    interval: IntervalDate;
    history: TaskHistory[]; // массив событий

    options: {
        coordinates: []
    }
}