import {
    CACHE_MANAGER,
    CacheModule,
    Inject,
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common';
import { TaskModule } from './tasks/task.module';
import { BoardController } from './board/board.controller';
import { DbModule } from './core/DB/db.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { MessageModule } from './core/notiffication/message.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [
        // PostgreSQL
        ConfigModule.forRoot({ isGlobal: true }),
        DbModule,
        UserModule,
        CompanyModule,
        TaskModule,
        MessageModule,
    ],
    controllers: [BoardController],
    providers: [],
})
export class AppModule {
    // @Inject(CACHE_MANAGER) cacheManager: Cache
    constructor() {
        // const client = cacheManager..getClient();
        // client.on('error', (err) => {
        //     console.info(err);
        // });
    }
}
