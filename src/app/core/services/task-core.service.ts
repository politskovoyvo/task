import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IntervalDate } from '@share/models/interval-date';
import { Track } from '@share/models/track';
import { Task } from '@share/models/task';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Base } from '@share/models/base';
import { tap } from 'rxjs/operators';
import { SpendTime } from '@share/models/spend-time';

@Injectable({
    providedIn: 'root',
})
export class TaskCoreService {
    private readonly _URL = 'https://...ru';
    private tasks_MOCK: Task[];
    private tracks_MOCK: Track[];

    constructor(private _httpClient: HttpClient) {
        this.initMock();
    }

    getTaskTypes(): Observable<Base[]> {
        return this.getTaskTypes_MOCK();
        return this._httpClient.get<Base[]>(`${this._URL}/api/board_id`);
    }

    createTask(boardId: number, newTask: Task): Observable<any> {
        return of({}).pipe(
            tap(() => {
                this.tasks_MOCK = this.tasks_MOCK.concat(newTask);
            })
        );
        return this._httpClient.post(
            `${this._URL}/api/board_id=${boardId}`,
            `${newTask}`
        );
    }

    editTask(editTask: Task) {
        let findTask = this.tasks_MOCK.find((task) => task.id === editTask.id);
        findTask = { ...editTask };
        return of();
        return this._httpClient.post(`${this._URL}/api/edit`, `${editTask}`);
    }

    removeTask(taskId: number) {
        this.tasks_MOCK.filter((task) => task.id !== taskId);
        return this._httpClient.post(`${this._URL}/api/edit`, `${taskId}`);
    }

    getTasks(boardId: number): Observable<Task[]> {
        return of(this.tasks_MOCK);
        return this._httpClient.get<Task[]>(`${this._URL}/api/board_id=${boardId}`);
    }

    getTrackes(boardId: number = 0): Observable<Track[]> {
        return of(this.tracks_MOCK);
        return this._httpClient.get<Track[]>(`${this._URL}/api/board_id=${boardId}`);
    }

    getTaskTypes_MOCK() {
        return of([
            { id: 1, name: 'task' },
            { id: 2, name: 'bug' },
            { id: 3, name: 'newType' },
        ]);
    }

    addSpendTime(taskId: number, userId: number, value: string): Observable<unknown> {
        return of();
    }

    editHistoryItem(
        historyId: number,
        value: string
    ): Observable<unknown> {
        return of([]);
    }

    removeSpendTime(spendTimeId: number): Observable<unknown> {
        return of();
    }

    initMock() {
        this.tasks_MOCK = [
            {
                id: 1,
                name: 'Реализовать функционал 1',
                simbol: 'ORR-2020',
                color: '#70227E',
                history: [
                    {
                        trackId: 1,
                        startDate: new Date(2020, 11, 30),
                        stopDate: new Date(2020, 11, 30),
                    },
                    {
                        trackId: 2,
                        startDate: new Date(2020, 11, 31),
                        stopDate: new Date(2020, 11, 31),
                    },

                    {
                        trackId: 3,
                        startDate: new Date(2021, 0, 8),
                        stopDate: new Date(2021, 0, 8),
                    },
                    {
                        trackId: 4,
                        startDate: new Date(2021, 0, 10),
                        stopDate: new Date(2021, 0, 10),
                    },
                    {
                        trackId: 5,
                        startDate: new Date(2021, 0, 12),
                        stopDate: new Date(2021, 0, 12),
                    },
                ],
                spendTime: 20,
                spendTimes: [
                    {
                        id: 1111,
                        date: new Date(),
                        type: 'spendTime',
                        perfomer: {
                            id: 1234567890,
                            name: 'Полицковой Владимир Олегович',
                        },
                        message: '10h',
                    } as SpendTime,
                    {
                        id: 2222,
                        date: new Date(),
                        type: 'message',
                        perfomer: {
                            id: 1234567890,
                            name: 'Полицковой Владимир Олегович',
                        },
                        message: 'NEW MESSAGE',
                    } as SpendTime,
                    {
                        id: 3323222,
                        date: new Date(),
                        type: 'message',
                        perfomer: {
                            id: 1234567890,
                            name: 'Полицковой Владимир Олегович',
                        },
                        message: 'AAВВЫВЫВA',
                    } as SpendTime,
                    {
                        id: 2222,
                        date: new Date(),
                        type: 'spendTime',
                        perfomer: {
                            id: 1234567890,
                            name: 'Полицковой Владимир Олегович',
                        },
                        message: '10h',
                    } as SpendTime,
                    {
                        id: 3232,
                        date: new Date(),
                        type: 'spendTime',
                        perfomer: {
                            id: 1234567890,
                            name: 'Полицковой Владимир Олегович',
                        },
                        message: '10h',
                    } as SpendTime,
                    {
                        id: 2223,
                        type: 'spendTime',
                        date: new Date(),
                        perfomer: {
                            id: 1234567890,
                            name: 'Полицковой Владимир Олегович',
                        },
                        message: '20h 30m',
                    } as SpendTime,
                ],
                priorityId: 1,
                type: 'type',
                performers: [
                    { id: 1, name: 'Тест1 Тестович1' },
                    { id: 2, name: 'Тест 2 Тестович' },
                    { id: 3, name: 'Тест 3 Тестович' },
                ],
                assignee: { id: 1, name: 'Тест1 Тестович1' },
            } as Task,
            {
                id: 2,
                name: 'Реализовать функционал 1',
                simbol: 'ORR-2021',
                color: 'blue',
                history: [
                    {
                        trackId: 1,
                        startDate: new Date(2020, 11, 30),
                        stopDate: new Date(2020, 11, 30),
                    },
                    {
                        trackId: 2,
                        startDate: new Date(2020, 11, 31),
                        stopDate: new Date(2020, 11, 31),
                    },

                    {
                        trackId: 3,
                        startDate: new Date(2021, 0, 2),
                        stopDate: new Date(2021, 0, 2),
                    },
                    {
                        trackId: 4,
                        startDate: new Date(2021, 0, 5),
                        stopDate: new Date(2021, 0, 5),
                    },
                    {
                        trackId: 5,
                        startDate: new Date(2021, 0, 11),
                        stopDate: new Date(2021, 0, 11),
                    },
                ],
                spendTime: 10,
                spendTimes: [
                    {
                        id: 1111,
                        date: new Date(),
                        type: 'spendTime',
                        perfomer: { id: 1, name: 'Петля Денис Петрович' },
                        message: '10h',
                    } as SpendTime,
                    {
                        id: 22123,
                        date: new Date(),
                        type: 'spendTime',
                        perfomer: {
                            id: 1234567890,
                            name: 'Полицковой Владимир Олегович',
                        },
                        message: '10h',
                    } as SpendTime,
                    {
                        id: 3333,
                        type: 'spendTime',
                        date: new Date(),
                        perfomer: {
                            id: 1234567890,
                            name: 'Полицковой Владимир Олегович',
                        },
                        message: '20h',
                    } as SpendTime,
                ],
                priorityId: 2,
                type: 'type',
                performers: [
                    { id: 1, name: 'Тест1 Тестович1' },
                    { id: 5, name: 'Тест 5 Тестович' },
                    { id: 2, name: 'Тест 2 Тестович' },
                    { id: 4, name: 'Тест 4 Тестович' },
                ],
                assignee: { id: 1, name: 'Тест 1 Тестович' },
            } as Task,
            {
                id: 3,
                name: 'Реализовать функционал 2',
                simbol: 'ORR-2022',
                color: 'green',
                history: [
                    {
                        trackId: 1,
                        startDate: new Date(2020, 11, 30),
                        stopDate: new Date(2020, 11, 30),
                    },
                    {
                        trackId: 2,
                        startDate: new Date(2021, 0, 1),
                        stopDate: new Date(2021, 0, 1),
                    },
                    {
                        trackId: 3,
                        startDate: new Date(2021, 0, 5),
                        stopDate: new Date(2021, 0, 5),
                    },
                    {
                        trackId: 5,
                        startDate: new Date(2021, 0, 12),
                        stopDate: new Date(2021, 0, 12),
                    },
                ],
                spendTime: 5,
                spendTimes: [
                    {
                        id: 1111,
                        date: new Date(),
                        type: 'spendTime',
                        perfomer: { id: 1, name: 'Петля Денис Петрович' },
                        message: '10h',
                    } as SpendTime,
                    {
                        id: 2222,
                        date: new Date(),
                        type: 'spendTime',
                        perfomer: {
                            id: 1234567890,
                            name: 'Полицковой Владимир Олегович',
                        },
                        message: '10h',
                    } as SpendTime,
                    {
                        id: 3333,
                        date: new Date(),
                        type: 'spendTime',
                        perfomer: { id: 1, name: 'Иванов Николай Николаевич' },
                        message: '20h',
                    } as SpendTime,
                ],
                priorityId: 3,
                type: 'type',
                performers: [
                    { id: 1, name: 'Тест1 Тестович1' },
                    { id: 2, name: 'Тест 2 Тестович' },
                    { id: 6, name: 'Тест 6 Тестович' },
                ],
                assignee: { id: 1, name: 'Тест1 Тестович1' },
            } as Task,
        ];
    }
}
