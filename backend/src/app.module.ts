import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/task.module';
import { BoardController } from './board/board.controller';
import { DbModule } from './core/DB/db.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { GateWayService } from './core/notiffication/gate-way.service';
import { MessageModule } from './core/notiffication/message.module';

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
    controllers: [AppController, BoardController],
    providers: [AppService],
})
export class AppModule {}
