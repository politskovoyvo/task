import { CACHE_MANAGER, Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { companyProviders } from './company.provider';
import { UserService } from '../user/user.service';
import { userProvider } from '../user/user.provider';
import { UserCompanyModule } from '../links/user-company/user-company.module';
import { GateWayService } from '../core/notiffication/gate-way.service';
import { MessageModule } from '../core/notiffication/message.module';
import { RedisCacheService } from '../core/DB/redis/redis-cash.service';
import { RedisCashModule } from '../core/DB/redis/redis-cash.module';

@Module({
    controllers: [CompanyController],
    imports: [UserCompanyModule, MessageModule, RedisCashModule],
    exports: [CompanyService],
    providers: [
        CompanyService,
        UserService,
        ...userProvider,
        ...companyProviders,
    ],
})
export class CompanyModule {}
