import { Provider } from '@nestjs/common';
import { REDIS_SUB, REDIS_PUB } from './redis.constants';
import Redis from 'ioredis';

export type RedisClient = Redis.Redis;

export const redisProvider: Provider[] = [
    {
        useFactory: () => {
            return new Redis({
                host: 'socket-redis',
                port: process.env.REDIS_PORT,
            });
        },
        provide: REDIS_SUB,
    },
    {
        useFactory: () => {
            return new Redis({
                host: 'socket-redis',
                port: process.env.REDIS_PORT,
            });
        },
        provide: REDIS_PUB,
    },
];
