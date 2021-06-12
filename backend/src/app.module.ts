import {
    CACHE_MANAGER,
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
import { RedisCacheService } from './core/DB/redis/redis-cash.service';

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
    providers: [RedisCacheService],
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
