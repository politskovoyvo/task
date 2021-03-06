import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { IAppState } from '@core/stores/app.state';
import { GetTasks } from '@core/stores/task/task.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Base } from '@share/models/base';
import { Track } from '@share/models/track';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
type TODO_USERS = any;

@UntilDestroy()
@Injectable({
    providedIn: 'root',
})
export class BoardCoreService {
    private readonly _KEY = '[board core] board';
    private readonly _URL = 'https://task.board.ru';

    private _currentBoard$ = new BehaviorSubject<Base>({} as Base);
    private _boards$ = new BehaviorSubject<Base[]>([]);

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService,
        private _taskStore: Store<IAppState>
    ) {}

    get currentBoard(): Base {
        return this._currentBoard$.value;
    }

    get currentBoardAsObservable(): Observable<Base> {
        return this._currentBoard$.asObservable();
    }

    getBoardsObservable() {
        return this._boards$.asObservable();
    }

    getUsersByBoardId(boardId: number): Observable<TODO_USERS[]> {
        return this.getUsersByBoardId_MOCK();
        return this._httpClient.get<TODO_USERS[]>(`${this._URL}/api/board_id=${boardId}`);
    }

    getBoardsByUserId(userId: number): Observable<Base[]> {
        return this.getBoardsByUserId_MOCK();
        return this._httpClient.get<Track[]>(`${this._URL}/api/board_id=${userId}`);
    }

    getTracks(boardId: number = 0): Observable<Track[]> {
        return this.getTracks_MOCK();
        return this._httpClient.get<Track[]>(`${this._URL}/api/board_id=${boardId}`);
    }

    initBoards() {
        this._currentBoard$.pipe(
            tap((board) => {
                this._taskStore.dispatch(new GetTasks());
            })
        );

        return this.getBoardsByUserId(this._authService.user.id).pipe(
            untilDestroyed(this),
            tap((boards: Base[]) => {
                const keyValue: Base = this.getLocalBoard();
                if (keyValue) {
                    const findLocalBoard: Base = boards.find(
                        (board) => board.id === keyValue.id
                    );
                    this._currentBoard$.next(findLocalBoard);
                } else {
                    this.setLocalBoard(boards[0]);
                }
                this._boards$.next(boards);
            })
        );
    }

    setLocalBoard(board: Base) {
        this._currentBoard$.next(board);
        localStorage.setItem(this._KEY, JSON.stringify(board));
    }

    private getLocalBoard(): Base {
        return JSON.parse(localStorage.getItem(this._KEY));
    }

    // ... MOCK ..............................
    getTracks_MOCK() {
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
    }

    getUsersByBoardId_MOCK() {
        return of([
            { id: 1, name: 'Тест1 Тестович1' },
            { id: 2, name: 'Тест2 Тестович2' },
            { id: 3, name: 'Тест3 Тестович3' },
            { id: 4, name: 'Галкин Максим Педиурович' },
            { id: 5, name: 'Игорь Станиславович Грю' },
            { id: 6, name: 'Александр Александрович Рович' },
        ]);
    }

    getBoardsByUserId_MOCK() {
        return of([
            {
                id: 1111,
                name: 'Frontend-classic-A001',
            } as Base,
            {
                id: 1112,
                name: 'Frontend-UI-B002',
            } as Base,
        ]);
    }
}
