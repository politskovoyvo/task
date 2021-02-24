import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    // MONGO_db
    // MongooseModule.forRoot(
    //   'mongodb+srv://Vladimir:Dkflbvbh19900@cluster0.pwyei.mongodb.net/task?retryWrites=true&w=majority',
    // ),

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
