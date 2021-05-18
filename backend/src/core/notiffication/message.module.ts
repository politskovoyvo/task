import { Module } from '@nestjs/common';
import { GateWayService } from './gate-way.service';

@Module({
    imports: [],
    controllers: [],
    providers: [GateWayService],
})
export class MessageModule {}
