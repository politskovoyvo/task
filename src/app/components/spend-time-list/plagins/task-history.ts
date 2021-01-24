import { Base } from '@share/models/base';
import { SpendTime } from '@share/models/spend-time';
import { BehaviorSubject, Observable } from 'rxjs';

export type historyType = 'spendTime' | 'message' | 'update';

interface ITaskHistory {
    selectedStore$(): Observable<IHistory[]>;
    setFilter(types: historyType[]): void;
    refresh(): void;
}

export interface IHistory {
    type: historyType;
    perfomer: Base;
    items: IHistoryItem[];
}

interface IHistoryItem {
    id: number;
    date: Date;
    message: string;
    spendTime?: string;
}

// TODO: create type
export interface IUpdateInfo {}

export class TaskHistory implements ITaskHistory {
    private _store$ = new BehaviorSubject<IHistory[]>([]);
    private _taskHistory: SpendTime[];
    private _historyTypes: historyType[];

    constructor(taskHistory: SpendTime[]) {
        this._taskHistory = [].concat(taskHistory).sort(this.dateSortUp);
        this.groupHistoryByType();
    }

    selectedStore$(): Observable<IHistory[]> {
        return this._store$.asObservable();
    }

    setFilter(types: historyType[]): void {
        this._historyTypes = types;
    }

    refresh(): void {
        throw new Error('Method not implemented.');
    }

    createHistoryByType(value: SpendTime) {
        switch (value.type) {
            case 'message':
                return {
                    id: value.id,
                    date: value.date,
                    message: value.message,
                } as IHistoryItem;
            case 'spendTime':
                return {
                    id: value.id,
                    date: value.date,
                    message: value.message,
                    spendTime: value.spendTime,
                } as IHistoryItem;
            case 'update':
                return {} as IHistoryItem;
        }
    }

    pushHistoryByType(acc: IHistory[], value: SpendTime) {
        let historyItem: IHistoryItem = this.createHistoryByType(value);

        acc.push({
            type: value.type,
            perfomer: value.perfomer,
            items: [].concat(historyItem),
        } as IHistory);
    }

    private groupHistoryByType() {
        const group: IHistory[] = this._taskHistory
            .reduce((acc, value, index) => {
                if (!index) {
                    this.pushHistoryByType(acc, value);
                    return acc;
                }

                const last = acc[acc.length - 1];
                if (last.perfomer.id === value.perfomer.id && last.type === value.type) {
                    last.items?.push(this.createHistoryByType(value));
                } else {
                    this.pushHistoryByType(acc, value);
                }

                return acc;
            }, [] as IHistory[])
            .filter((g: IHistory) => {
                if (!this._historyTypes?.length) {
                    return true;
                }
                return this._historyTypes.includes(g.type);
            });
        console.log(group);
        this._store$.next(group);
    }

    private dateSortUp(history1: SpendTime, history2: SpendTime) {
        return history1.date > history2.date ? -1 : 1;
    }
}
