import { UntilDestroy } from '@ngneat/until-destroy';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class WebsocketService {
    // @ts-ignore
    _socket: SocketIOClient.Socket;
    private _invites$ = new BehaviorSubject<string[]>([]);

    constructor() {}

    setupSocketConnection() {
        // this._socket = io(`${environment.urls.taskApi}/events`);

        // @ts-ignore
        this._socket = io.connect(`${environment.urls.taskApi}/messages`, {
            // transports: ['websocket'],
            autoConnect: true,
            // timeout: 1000,
        });
        // this._socket.emit('msgToServer', {});
        // this._socket.emit('msgToServer', { event: 'events', data: { test: true } });
        // console.log(this._socket.connected); // false
        // this._socket.connect();
        this._socket.on('connected', () => {
            console.log('connected !');
        });

        this._socket.io.on('close', () => {
            console.log('dsd');
        });
        // @ts-ignore
        // io.on('connection', () => {
        //     // Вот сюда не заходит
        //     console.log('connection');
        // });

        this._socket.on('msgToClient', (message: string) => {
            // Вот сюда не заходит
            console.log(message);
        });
    }

    emit(event: string, data: any) {
        this._socket.io.connect();
        this._socket.emit(event, 'Новое сообщение');
    }

    inviteOn$() {
        this._socket.on('msgToClient', (msg) => {
            this._invites$.next([...this._invites$.value, msg]);
        });

        return this._invites$.asObservable();
    }
}
