import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './tasks/task.module';
import { BoardController } from './board/board.controller';
import { CompanyController } from './company/company.controller';
import { DbModule } from './core/DB/db.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { TokenService } from './share/services/token.service';
import { UserCompanyModule } from './links/user-company/user-company.module';

@Module({
    imports: [
        // PostgreSQL
        ConfigModule.forRoot({ isGlobal: true }),
        DbModule,
        UserModule,
        CompanyModule,
        TaskModule,
    ],
    controllers: [AppController, BoardController],
    providers: [AppService],
})
export class AppModule {}
