import { Point } from '@modules/graph/components/graph/graph.component';
import { Base } from './base';
import { IntervalDate } from './interval-date';
import { SpendTime } from './spend-time';

export interface History extends IntervalDate {
    trackId: number; // id типа таска (например Release, feature  и тд)
}

export interface Task extends Base {
    type: string;
    color: string;
    symbol: string;
    priorityId: number;
    assignee: Base;
    performers: Base[];
    spendTime: string;
    history: History[]; // массив событий
    info?: string; // описание
    histories: SpendTime[];

    options: {
        coordinates: [];
        minDate: Date;
        points: Point[];
    };
}
