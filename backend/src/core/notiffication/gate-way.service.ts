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
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { RedisCacheService } from '../DB/redis/redis-cash.service';
import { InviteUserDto } from '../../company/dto/invite-user.dto';
import { InviteUserMessage } from './models/invite-user';

@WebSocketGateway({ namespace: '/messages' })
export class GateWayService
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    // private readonly _redisService: RedisCacheService
    public constructor() {}

    private _logger: Logger = new Logger('Gateway');

    @SubscribeMessage('msgToServer')
    public handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() userId: any,
    ): void {
        this._logger.log(`msgToServer: ${userId}`);
        // client.join(userId);
        // this.server.to(userId);
        // this.server.emit('msgToClient', data);
    }

    @SubscribeMessage('connectUserId')
    connectUserId(
        @ConnectedSocket() client: Socket,
        @MessageBody() userId: any,
    ) {
        this._logger.log(`Client connected: ${userId}`);
        client.join(userId);
    }

    @SubscribeMessage('inviteMessage')
    inviteMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() userId: string,
    ) {
        // this.server.in('someUserId').emit('inviteCompanyLink', 'dsdsd'); // заглушка
        // TODO: create DTO
        this._logger.log(`Invite: ${userId}`);
        this.server.to(userId).emit('inviteCompanyLink', 'dsdsd');
    }

    testInvite(inviteUser: InviteUserMessage) {
        this.server.to(inviteUser.userId).emit('inviteCompanyLink', inviteUser);
    }

    emit(event: string, data: any): void {}

    handleConnection(client: Socket, text: string): any {
        // this._logger.log(`Client connected: ${client.id}`);
        // const cookie = client.handshake;
        // client.emit('msgToClient', 'dsdsd');
        // this.server.to(client.id);
    }

    handleDisconnect(client: Socket): any {
        this._logger.log(`Disconnect`);
        // return this._logger.log(`Client disconnected: ${client.id}`);
    }

    afterInit(server: any): any {}
}
