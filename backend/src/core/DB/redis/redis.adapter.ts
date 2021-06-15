import { IoAdapter } from '@nestjs/platform-socket.io';
import * as io from 'socket.io';
import * as redisIoAdapter from 'socket.io-redis';
import * as redis from 'redis';

export class RedisIoAdapter extends IoAdapter {
    protected ioServer: io.Server;

    constructor(app: any) {
        super();
        const httpServer = app.getHttpServer();
        this.ioServer = io(httpServer);
    }

    createIOServer(port: number, options?: io.ServerOptions): any {
        let server;
        if (port === 0 || port === +(process.env.PORT || '1234'))
            server = this.ioServer;
        else server = super.createIOServer(port, options);

        const pub = redis.createClient({
            host: process.env.REDIS_HOST || 'localhost',
            port: +(process.env.REDIS_HOST || '6379'),
        });
        const sub = redis.createClient({
            host: process.env.REDIS_HOST || 'localhost',
            port: +(process.env.REDIS_HOST || '6379'),
        });

        const redisAdapter = redisIoAdapter({ pubClient: pub, subClient: sub });

        server.adapter(redisAdapter);
        return server;
    }
}
