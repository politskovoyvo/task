import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './tasks/task.module';
import { BoardController } from './board/board.controller';
import { CompanyController } from './company/company.controller';
import { DbModule } from '../core/DB/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TaskModule,
    // MONGO_db
    // MongooseModule.forRoot(
    //   'mongodb+srv://Vladimir:Dkflbvbh19900@cluster0.pwyei.mongodb.net/task?retryWrites=true&w=majority',
    // ),

    // PostgreSQL
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
  ],
  controllers: [AppController, BoardController, CompanyController],
  providers: [AppService],
})
export class AppModule {}
