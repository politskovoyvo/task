import { CacheModule, Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cash.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            ttl: undefined,
        }),
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService],
    controllers: [],
})
export class RedisCashModule {}
