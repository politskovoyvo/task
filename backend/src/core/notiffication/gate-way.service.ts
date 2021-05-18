import { Injectable } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
// import { Server } from 'ws';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: '/messages' })
export class GateWayService
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    private _logger: Logger = new Logger('Gateway');

    @SubscribeMessage('msgToServer')
    public handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: any,
    ): void {
        this._logger.log(`${client.id}:, ${data}`);
        this.server.emit('msgToClient', data);
    }

    emit(event: string, data: any): void {}

    afterInit(server: Server): any {
        this._logger.log('init');
    }

    handleConnection(client: Socket, text: string): any {
        this._logger.log(`Client connected: ${client.id}`);
        // const cookie = client.handshake;
        client.emit('msgToClient', 'dsdsd');
    }

    handleDisconnect(client: Socket): any {
        return this._logger.log(`Client disconnected: ${client.id}`);
    }
}
