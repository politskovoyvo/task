export class TaskDto {
  readonly type: string;
  readonly color: string;
  readonly symbol: string;
  readonly priorityId: number;
  readonly assigneeUserId: number;
  spendTime: string;
  history?: History[]; // массив событий
  description?: string; // описание
  histories: SpendTime[];
  // performers: Base[];
}

export type historyType =
  | 'spendTime'
  | 'message'
  | 'update'
  | 'spendTimeEDIT'
  | 'messageEDIT'
  | 'updateEDIT';

export interface SpendTime {
  id: number;
  perfomer: Base;
  message: string;
  date: Date;
  type: historyType;
  spendTime?: string;
}

interface History extends IntervalDate {
  trackId: number; // id типа таска (например Release, feature  и тд)
}

export interface IntervalDate {
  startDate: string;
  stopDate: string;
}

export interface Base {
  id: number;
  name: string;
}
