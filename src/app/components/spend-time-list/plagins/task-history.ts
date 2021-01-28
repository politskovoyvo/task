import { Base } from '@share/models/base';
import { SpendTime } from '@share/models/spend-time';
import { BehaviorSubject, Observable } from 'rxjs';

export type historyType =
    | 'spendTime'
    | 'message'
    | 'update'
    | 'spendTimeEDIT'
    | 'messageEDIT'
    | 'updateEDIT';

interface ITaskHistory {
    selectedStore$(): Observable<IHistory[]>;
    setFilter(types: historyType[]): void;
    editHistory(historyItem: IHistoryItem);
    refresh(): void;
}

export interface IHistory {
    type: historyType;
    perfomer: Base;
    items: IHistoryItem[];
}

export interface IHistoryItem {
    id: number;
    date: Date;
    value: string;
    type: historyType;
    cash?: IHistoryItem;
}

// TODO: create type
export interface IUpdateInfo {}

export class TaskHistory implements ITaskHistory {
    private _store$ = new BehaviorSubject<IHistory[]>([]);
    private _cashStore: IHistory[] = [];
    private _taskHistory: SpendTime[];
    private _historyTypes: historyType[];

    constructor(taskHistory: SpendTime[]) {
        this._taskHistory = [].concat(taskHistory).sort(this.dateSortUp);
        this.groupHistoryByType();
    }

    reset() {
        this._store$.next(this.getCloneStore(this._cashStore));
    }

    editHistory(historyItem: IHistoryItem) {
        let findHistoryItem = this._cashStore
            .map((i) => i.items)
            .reduce((acc, item) => acc.concat(item))
            .find((i) => i.id === historyItem.id);

        findHistoryItem = historyItem;
    }

    getStoreValue() {
        return this._store$.getValue();
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
                    value: value.message,
                    type: value.type,
                    cash: {
                        id: value.id,
                        date: value.date,
                        value: value.message,
                        type: value.type,
                    },
                } as IHistoryItem;
            case 'spendTime':
                return {
                    id: value.id,
                    date: value.date,
                    value: value.message,
                    spendTime: value.spendTime,
                    type: value.type,
                    cash: {
                        id: value.id,
                        date: value.date,
                        value: value.message,
                        spendTime: value.spendTime,
                        type: value.type,
                    },
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

        this._cashStore = this.getCloneStore(group);
        this._store$.next(group);
    }

    getCloneStore(store) {
        return JSON.parse(JSON.stringify(store));
    }

    private dateSortUp(history1: SpendTime, history2: SpendTime) {
        return history1.date > history2.date ? -1 : 1;
    }
}
