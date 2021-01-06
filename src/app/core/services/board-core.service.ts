import { Injectable } from '@angular/core';
import { Base } from '@share/models/base';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BoardCoreService {
  private _currentBoard: Base = {
    id: 9999,
    name: 'TASK-frontend',
  } as Base;
  private _boards$ = new BehaviorSubject<Base[]>([]);

  constructor() {}

  get currentBoard() {
    return this._currentBoard;
  }

  getBoardsObservable() {
    return this._boards$.asObservable();
  }

  getBoardsByUserId(userId: number) {}
}
