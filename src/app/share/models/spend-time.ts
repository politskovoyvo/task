import { historyType } from '@components/spend-time-list/plagins/task-history';
import { Base } from './base';

export interface SpendTime {
    id: number;
    perfomer: Base;
    message: string;
    date: Date;
    type: historyType;
    spendTime?: string;
}
