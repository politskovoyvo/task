import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IntervalDate } from '@share/models/interval-date';
import { Track } from '@share/models/track';
import { Task } from '@share/models/task';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Base } from '@share/models/base';
import { map, tap } from 'rxjs/operators';
import { SpendTime } from '@share/models/spend-time';
import { JsonFileService } from '@share/services/json-file.service';
import { stringify } from 'querystring';

@Injectable({
    providedIn: 'root',
})
export class TaskCoreService {
    private readonly _URL = 'http://localhost:1234';
    private readonly _TEST_URI = 'http://localhost:1234';

    // tslint:disable-next-line:variable-name
    private tracks_MOCK: Track[];

    constructor(
        private _httpClient: HttpClient,
        private _jsonFileService: JsonFileService
    ) {
        this.initMock();
    }

    getTaskTypes(): Observable<Base[]> {
        // return this.getTaskTypes_MOCK();
        return this._httpClient.get<Base[]>(`${this._URL}/api/board_id`);
    }

    getTaskStates() {
        return this._httpClient.get<Base[]>(`${this._URL}/api/board_id`);
    }

    createTask(boardId: number, newTask: Task): Observable<any> {
        return this._httpClient.post(`${this._TEST_URI}/tasks`, newTask);
    }

    editTask(editTask: Task) {
        return this._httpClient.put(`${this._TEST_URI}/tasks/${editTask.id}`, editTask);
    }

    removeTask(id: number) {
        return this._httpClient.delete(`${this._TEST_URI}/tasks/${id}`);
    }

    getTasks(boardId: number): Observable<Task[]> {
        // return of(this.tasks_MOCK);
        return this._httpClient.get<Task[]>(`${this._TEST_URI}/tasks`).pipe(
            map((tasks: Task[]) =>
                tasks?.map((task) => ({
                    ...task,
                    history: task.history.map((h) => ({
                        ...h,
                        startDate: new Date(h.startDate),
                        stopDate: new Date(h.stopDate),
                    })),
                }))
            )
        );
        // return this._httpClient.get<Task[]>(`${this.TEST_URI}/api/board_id=${boardId}`);
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

    editHistoryItem(historyId: number, value: string): Observable<unknown> {
        return of([]);
    }

    removeSpendTime(spendTimeId: number): Observable<unknown> {
        return of();
    }

    initMock() {
        // this.tasks_MOCK = [
        //     {
        //         id: 1,
        //         name: 'Реализовать функционал 1',
        //         simbol: 'ORR-2020',
        //         color: '#70227E',
        //         history: [
        //             {
        //                 trackId: 1,
        //                 startDate: new Date(2020, 11, 30),
        //                 stopDate: new Date(2020, 11, 30),
        //             },
        //             {
        //                 trackId: 2,
        //                 startDate: new Date(2020, 11, 31),
        //                 stopDate: new Date(2020, 11, 31),
        //             },
        //
        //             {
        //                 trackId: 3,
        //                 startDate: new Date(2021, 0, 8),
        //                 stopDate: new Date(2021, 0, 8),
        //             },
        //             {
        //                 trackId: 4,
        //                 startDate: new Date(2021, 0, 10),
        //                 stopDate: new Date(2021, 0, 10),
        //             },
        //             {
        //                 trackId: 5,
        //                 startDate: new Date(2021, 0, 12),
        //                 stopDate: new Date(2021, 0, 12),
        //             },
        //         ],
        //         spendTime: 20,
        //         histories: [
        //             {
        //                 id: 1111,
        //                 date: new Date(),
        //                 type: 'spendTime',
        //                 perfomer: {
        //                     id: 1234567890,
        //                     name: 'Полицковой Владимир Олегович',
        //                 },
        //                 message: '10h',
        //             } as SpendTime,
        //             {
        //                 id: 2222,
        //                 date: new Date(),
        //                 type: 'message',
        //                 perfomer: {
        //                     id: 1234567890,
        //                     name: 'Полицковой Владимир Олегович',
        //                 },
        //                 message: 'NEW MESSAGE',
        //             } as SpendTime,
        //             {
        //                 id: 3323222,
        //                 date: new Date(),
        //                 type: 'message',
        //                 perfomer: {
        //                     id: 1234567890,
        //                     name: 'Полицковой Владимир Олегович',
        //                 },
        //                 message: 'AAВВЫВЫВA',
        //             } as SpendTime,
        //             {
        //                 id: 2222,
        //                 date: new Date(),
        //                 type: 'spendTime',
        //                 perfomer: {
        //                     id: 1234567890,
        //                     name: 'Полицковой Владимир Олегович',
        //                 },
        //                 message: '10h',
        //             } as SpendTime,
        //             {
        //                 id: 3232,
        //                 date: new Date(),
        //                 type: 'spendTime',
        //                 perfomer: {
        //                     id: 1234567890,
        //                     name: 'Полицковой Владимир Олегович',
        //                 },
        //                 message: '10h',
        //             } as SpendTime,
        //             {
        //                 id: 2223,
        //                 type: 'spendTime',
        //                 date: new Date(),
        //                 perfomer: {
        //                     id: 1234567890,
        //                     name: 'Полицковой Владимир Олегович',
        //                 },
        //                 message: '20h 30m',
        //             } as SpendTime,
        //         ],
        //         priorityId: 1,
        //         type: 'type',
        //         performers: [
        //             { id: 1, name: 'Тест1 Тестович1' },
        //             { id: 2, name: 'Тест 2 Тестович' },
        //             { id: 3, name: 'Тест 3 Тестович' },
        //         ],
        //         assignee: { id: 1, name: 'Тест1 Тестович1' },
        //     } as Task,
        //     {
        //         id: 2,
        //         name: 'Реализовать функционал 1',
        //         simbol: 'ORR-2021',
        //         color: 'blue',
        //         history: [
        //             {
        //                 trackId: 1,
        //                 startDate: new Date(2020, 11, 30),
        //                 stopDate: new Date(2020, 11, 30),
        //             },
        //             {
        //                 trackId: 2,
        //                 startDate: new Date(2020, 11, 31),
        //                 stopDate: new Date(2020, 11, 31),
        //             },
        //
        //             {
        //                 trackId: 3,
        //                 startDate: new Date(2021, 0, 2),
        //                 stopDate: new Date(2021, 0, 2),
        //             },
        //             {
        //                 trackId: 4,
        //                 startDate: new Date(2021, 0, 5),
        //                 stopDate: new Date(2021, 0, 5),
        //             },
        //             {
        //                 trackId: 5,
        //                 startDate: new Date(2021, 0, 11),
        //                 stopDate: new Date(2021, 0, 11),
        //             },
        //         ],
        //         spendTime: 10,
        //         histories: [
        //             {
        //                 id: 1111,
        //                 date: new Date(),
        //                 type: 'spendTime',
        //                 perfomer: { id: 1, name: 'Петля Денис Петрович' },
        //                 message: '10h',
        //             } as SpendTime,
        //             {
        //                 id: 22123,
        //                 date: new Date(),
        //                 type: 'spendTime',
        //                 perfomer: {
        //                     id: 1234567890,
        //                     name: 'Полицковой Владимир Олегович',
        //                 },
        //                 message: '10h',
        //             } as SpendTime,
        //             {
        //                 id: 3333,
        //                 type: 'spendTime',
        //                 date: new Date(),
        //                 perfomer: {
        //                     id: 1234567890,
        //                     name: 'Полицковой Владимир Олегович',
        //                 },
        //                 message: '20h',
        //             } as SpendTime,
        //         ],
        //         priorityId: 2,
        //         type: 'type',
        //         performers: [
        //             { id: 1, name: 'Тест1 Тестович1' },
        //             { id: 5, name: 'Тест 5 Тестович' },
        //             { id: 2, name: 'Тест 2 Тестович' },
        //             { id: 4, name: 'Тест 4 Тестович' },
        //         ],
        //         assignee: { id: 1, name: 'Тест 1 Тестович' },
        //     } as Task,
        //     {
        //         id: 3,
        //         name: 'Реализовать функционал 2',
        //         simbol: 'ORR-2022',
        //         color: 'green',
        //         history: [
        //             {
        //                 trackId: 1,
        //                 startDate: new Date(2020, 11, 30),
        //                 stopDate: new Date(2020, 11, 30),
        //             },
        //             {
        //                 trackId: 2,
        //                 startDate: new Date(2021, 0, 1),
        //                 stopDate: new Date(2021, 0, 1),
        //             },
        //             {
        //                 trackId: 3,
        //                 startDate: new Date(2021, 0, 5),
        //                 stopDate: new Date(2021, 0, 5),
        //             },
        //             {
        //                 trackId: 5,
        //                 startDate: new Date(2021, 0, 12),
        //                 stopDate: new Date(2021, 0, 12),
        //             },
        //         ],
        //         spendTime: 5,
        //         histories: [
        //             {
        //                 id: 1111,
        //                 date: new Date(),
        //                 type: 'spendTime',
        //                 perfomer: { id: 1, name: 'Петля Денис Петрович' },
        //                 message: '10h',
        //             } as SpendTime,
        //             {
        //                 id: 2222,
        //                 date: new Date(),
        //                 type: 'spendTime',
        //                 perfomer: {
        //                     id: 1234567890,
        //                     name: 'Полицковой Владимир Олегович',
        //                 },
        //                 message: '10h',
        //             } as SpendTime,
        //             {
        //                 id: 3333,
        //                 date: new Date(),
        //                 type: 'spendTime',
        //                 perfomer: { id: 1, name: 'Иванов Николай Николаевич' },
        //                 message: '20h',
        //             } as SpendTime,
        //         ],
        //         priorityId: 3,
        //         type: 'type',
        //         performers: [
        //             { id: 1, name: 'Тест1 Тестович1' },
        //             { id: 2, name: 'Тест 2 Тестович' },
        //             { id: 6, name: 'Тест 6 Тестович' },
        //         ],
        //         assignee: { id: 1, name: 'Тест1 Тестович1' },
        //     } as Task,
        // ];
    }
}
