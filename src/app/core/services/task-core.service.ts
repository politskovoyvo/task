import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IntervalDate } from '@share/models/interval-date';
import { Track } from '@share/models/track';
import { Task } from '@share/models/task';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Base } from '@share/models/base';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskCoreService {
  private readonly _URL = 'https://...ru';
  private _tasks = new BehaviorSubject<Task[]>([]);
  private mockTasks: Task[];
  private mockTracks: Track[];

  constructor(private httpClient: HttpClient) {
    this.initMock();
  }

  getTaskTypes(): Observable<Base[]> {
    return of([
      { id: 1, name: 'task' },
      { id: 2, name: 'bug' },
      { id: 3, name: 'newType' },
    ]);
  }

  createTask(boardId: number, newTask: Task): Observable<any> {
    this.mockTasks.push(newTask);
    return of({}).pipe(tap(() => this.mockTasks.push(newTask)));
    return this.httpClient.post(`${this._URL}/api/board_id=${boardId}`, `${newTask}`);
  }

  editTask(editTask: Task) {
    return this.httpClient.post(`${this._URL}/api/edit`, `${editTask}`);
  }

  getTasks(boardId: number): Observable<Task[]> {
    return of(this.mockTasks);
    return this.httpClient.get<Task[]>(`${this._URL}/api/board_id=${boardId}`);
  }

  public getTrackes(boardId: number = 0): Observable<Track[]> {
    return of(this.mockTracks);
    return this.httpClient.get<Track[]>(`${this._URL}/api/board_id=${boardId}`);
  }

  private initMock() {
    this.mockTasks = [
      {
        id: 1,
        name: 'Реализовать функционал 1',
        simbol: 'ORR-2020',
        color: '#70227E',
        history: [
          {
            trackId: 1,
            startDate: new Date(2020, 11, 1),
            stopDate: new Date(2020, 11, 5),
          },
          {
            trackId: 2,
            startDate: new Date(2020, 11, 5),
            stopDate: new Date(2020, 11, 7),
          },
          {
            trackId: 3,
            startDate: new Date(2020, 11, 7),
            stopDate: new Date(2020, 11, 8),
          },
          {
            trackId: 4,
            startDate: new Date(2020, 11, 8),
            stopDate: new Date(2020, 11, 12),
          },
          {
            trackId: 5,
            startDate: new Date(2020, 11, 13),
            stopDate: new Date(2020, 11, 13),
          },
        ],
        spendTime: 20,
        priorityId: 1,
        type: 'type',
        performers: [
          { id: 1, name: 'Тест 1 Тестович' },
          { id: 2, name: 'Тест 2 Тестович' },
          { id: 3, name: 'Тест 3 Тестович' },
        ],
      } as Task,
      {
        id: 2,
        name: 'Реализовать функционал 1',
        simbol: 'ORR-2021',
        color: 'blue',
        history: [
          {
            trackId: 1,
            startDate: new Date(2020, 11, 2),
            stopDate: new Date(2020, 11, 4),
          },
          {
            trackId: 3,
            startDate: new Date(2020, 11, 4),
            stopDate: new Date(2020, 11, 5),
          },
          {
            trackId: 4,
            startDate: new Date(2020, 11, 7),
            stopDate: new Date(2020, 11, 12),
          },
          {
            trackId: 5,
            startDate: new Date(2020, 11, 13),
            stopDate: new Date(2020, 11, 13),
          },
        ],
        spendTime: 10,
        priorityId: 2,
        type: 'type',
        performers: [
          { id: 1, name: 'Тест 1 Тестович' },
          { id: 5, name: 'Тест 5 Тестович' },
          { id: 2, name: 'Тест 2 Тестович' },
          { id: 4, name: 'Тест 4 Тестович' },
        ],
      } as Task,
      {
        id: 3,
        name: 'Реализовать функционал 2',
        simbol: 'ORR-2022',
        color: 'green',
        history: [
          {
            trackId: 1,
            startDate: new Date(2020, 11, 2),
            stopDate: new Date(2020, 11, 8),
          },
          {
            trackId: 2,
            startDate: new Date(2020, 11, 9),
            stopDate: new Date(2020, 11, 10),
          },
          {
            trackId: 4,
            startDate: new Date(2020, 11, 10),
            stopDate: new Date(2020, 11, 12),
          },
          {
            trackId: 5,
            startDate: new Date(2020, 11, 13),
            stopDate: new Date(2020, 11, 13),
          },
        ],
        spendTime: 5,
        priorityId: 3,
        type: 'type',
        performers: [
          { id: 1, name: 'Тест 1 Тестович' },
          { id: 2, name: 'Тест 2 Тестович' },
          { id: 2, name: 'Тест 2 Тестович' },
          { id: 6, name: 'Тест 6 Тестович' },
        ],
      } as Task,
    ];

    this.mockTracks = [
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
    ];
  }
}
