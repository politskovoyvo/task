export interface TaskDto {
  type: string;
  color: string;
  symbol: string;
  priority: Priority;
  assignee: Base;
  performers: Base[];
  spendTime: string;
  history?: History[]; // массив событий
  info?: string; // описание
  // histories: SpendTime[];
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

export interface Priority extends Base {
  color: string;
}

export interface Base {
  id: number;
  name: string;
}
