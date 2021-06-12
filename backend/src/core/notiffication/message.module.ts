import { CacheModule, Module } from '@nestjs/common';
import { GateWayService } from './gate-way.service';
import { RedisCacheService } from '../DB/redis/redis-cash.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        }),
    ],
    controllers: [],
    providers: [GateWayService],
})
export class MessageModule {}
