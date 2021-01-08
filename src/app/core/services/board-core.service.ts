import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Base } from '@share/models/base';
import { Track } from '@share/models/track';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
type TODO_USERS = any;

@Injectable()
export class BoardCoreService {
  private readonly _URL = 'https://task.board.ru';

  private _currentBoard: Base;
  private _boards$ = new BehaviorSubject<Base[]>([]);

  constructor(private httpClient: HttpClient) {}

  get currentBoard() {
    return this._currentBoard;
  }

  getBoardsObservable() {
    return this._boards$.asObservable();
  }

  getUsersByBoardId(boardId: number): Observable<TODO_USERS[]> {
    // TODO: remove MOCK
    return of([
      { id: 1, name: 'Тест1 Тестович1' },
      { id: 2, name: 'Тест2 Тестович2' },
      { id: 3, name: 'Тест3 Тестович3' },
      { id: 4, name: 'Тест4 Тестович4' },
      { id: 5, name: 'Тест5 Тестович5' },
      { id: 6, name: 'Тест6 Тестович6' },
    ]);
    return this.httpClient.get<TODO_USERS[]>(`${this._URL}/api/board_id=${boardId}`);
  }

  getBoardsByUserId(userId: number): Observable<Base[]> {
    // TODO: remove MOCK
    return of([
      {
        id: 1111,
        name: 'frontend-001',
      } as Base,
      {
        id: 1112,
        name: 'frontend-002',
      } as Base,
    ]).pipe(tap((boards) => (this._currentBoard = boards[0])));
    return this.httpClient.get<Track[]>(`${this._URL}/api/board_id=${userId}`);
  }

  public getTracks(boardId: number = 0): Observable<Track[]> {
    // TODO: remove MOCK
    return of([
      {
        id: 1,
        name: 'Wait',
        color: '#F0E68C',
      } as Track,
      {
        id: 2,
        name: 'Process',
        color: '#BA55D3',
      } as Track,
      {
        id: 3,
        name: 'Test',
        color: '#4169E1',
      } as Track,
      {
        id: 4,
        name: 'Done',
        color: '#008B8B',
      } as Track,
      {
        id: 5,
        name: 'Release',
        color: '#FF7F50',
      } as Track,
    ]);
    return this.httpClient.get<Track[]>(`${this._URL}/api/board_id=${boardId}`);
  }
}
