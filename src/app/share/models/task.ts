import { Point } from '@modules/graph/components/graph/graph.component';
import { Base } from './base';
import { IntervalDate } from './interval-date';

interface TaskHistory extends IntervalDate  {
    trackId: number; // id типа таска (например Release, feature  и тд)
}

export interface Task extends Base {
    type: string;
    color: string;
    simbol: string;
    priorityId: number;
    assignee: Base;
    performers: Base[];
    spendTime: number;
    history: TaskHistory[]; // массив событий
    info?: string; // описание

    options: {
        coordinates: [];
        minDate: Date;
        points: Point[];
    }
}