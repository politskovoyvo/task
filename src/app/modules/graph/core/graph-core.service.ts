import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from 'src/app/share/models/task';

@Injectable()
export class GraphCoreService {
    constructor() {

    }

    public getTasks(): Observable<Task[]> {
        return of([
          {
            id: 1,
            name: 'Реализовать функционал 1',
            simbol: 'TASK-1',
            startDate: '',
            stopDate: '',
            assignee: [
                { id: 1, name: 'Тест 1 Тестович' },
                { id: 2, name: 'Тест 2 Тестович' },
            ]
          } as Task,
          {
            id: 1,
            name: 'Реализовать функционал 1',
            simbol: 'TASK-1',
            startDate: '',
            stopDate: '',
            assignee: [
                { id: 1, name: 'Тест 1 Тестович' },
                { id: 2, name: 'Тест 2 Тестович' },
            ]
          } as Task,
          {
            id: 1,
            name: 'Реализовать функционал 1',
            simbol: 'TASK-1',
            startDate: '',
            stopDate: '',
            assignee: [
                { id: 1, name: 'Тест 1 Тестович' },
                { id: 2, name: 'Тест 2 Тестович' },
            ]
          } as Task,
        ]);
    }
}