import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Base } from '@share/models/base';
import { Track } from '@share/models/pocess-type';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class BoardCoreService {
  private readonly URL = 'https://task.board.ru';

  private _currentBoard: Base = {
    id: 9999,
    name: 'TASK-frontend',
  } as Base;
  private _boards$ = new BehaviorSubject<Base[]>([]);

  constructor(private httpClient: HttpClient) {}

  get currentBoard() {
    return this._currentBoard;
  }

  getBoardsObservable() {
    return this._boards$.asObservable();
  }

  getBoardsByUserId(userId: number) {}

  public getTracks(boardId: number = 0): Observable<Track[]> {
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
    return this.httpClient.get<Track[]>(
      `${this.URL}/api/board_id=${boardId}`
    );
  }
}
