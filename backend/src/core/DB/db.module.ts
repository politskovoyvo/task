import { Module } from '@nestjs/common';
import { databaseProviders } from './db.providers';
import { GateWayService } from '../notiffication/gate-way.service';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DbModule {}
