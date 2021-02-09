import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Base } from '@share/models/base';
import { Observable, of } from 'rxjs';
import { Priority } from '@core/models/priority';

@Injectable()
export class CompanyCoreService {
    private readonly _URL = 'https://task.company.ru';

    constructor(private httpClient: HttpClient) {}

    getPriories(): Observable<Priority[]> {
        return of([
            {
                id: 1,
                name: 'normal',
                color: '#8A2BE2',
            } as Priority,
            {
                id: 2,
                name: 'major',
                color: '#DAA520',
            } as Priority,
            {
                id: 3,
                name: 'critical',
                color: '#B22222',
            } as Priority,
        ]);
        return this.httpClient.get<Priority[]>(`${this._URL}/api/getusers`);
    }

    getUsers(): Observable<Base[]> {
        return of([
            { id: 1, name: 'Тест1 Тестович1' },
            { id: 2, name: 'Тест2 Тестович2' },
            { id: 3, name: 'Тест3 Тестович3' },
            { id: 4, name: 'Тест4 Тестович4' },
            { id: 5, name: 'Тест5 Тестович5' },
            { id: 6, name: 'Александр Александрович Рович' },
            { id: 7, name: 'Тест7 Тестович7' },
            { id: 8, name: 'Тест8 Тестович8' },
            { id: 9, name: 'Тест9 Тестович9' },
            { id: 10, name: 'Тест10 Тестович10' },
            { id: 11, name: 'Максим Викторович Зимилин' },
            { id: 12, name: 'Новый Сотрудник Содрудникович' },
        ]);
        return this.httpClient.get<Base[]>(`${this._URL}/api/getusers`);
    }

    addNewUser(user: Base) {
        return this.httpClient.post(`${this._URL}/api/getusers`, { user });
    }

    removeUser(userId: number) {
        return this.httpClient.post(`${this._URL}/api/getusers`, { id: userId });
    }
}
