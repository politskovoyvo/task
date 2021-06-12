import { UntilDestroy } from '@ngneat/until-destroy';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as io from 'socket.io-client';
import { AuthService } from '@core/auth/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private _socket: SocketIOClient.Socket;
    private _invites$ = new BehaviorSubject<string[]>([]);

    constructor(private readonly _authService: AuthService) {}

    setupSocketConnection() {
        this._socket = io.connect(`${environment.urls.taskApi}/messages`, {
            // transports: ['websocket'],
            autoConnect: true,
            // timeout: 1000,
        });

        this._socket.on('connect', () => {
            this._socket.emit('connectUserId', this._authService.user.id);
        });

        this.onInvite$().subscribe(console.log);
    }

    emit(event: string, data: any) {
        // this._socket.io.connect();
        this._socket.emit(event, data);
    }

    onInvite$() {
        this._socket.on('inviteCompanyLink', (msg) => {
            this._invites$.next([...this._invites$.value, msg]);
        });

        return this._invites$.asObservable();
    }
}
