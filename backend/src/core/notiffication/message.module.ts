import { CacheModule, Module } from '@nestjs/common';
import { GateWayService } from './gate-way.service';
import { RedisCacheService } from '../DB/redis/redis-cash.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [],
    controllers: [],
    providers: [GateWayService],
    exports: [GateWayService],
})
export class MessageModule {}
