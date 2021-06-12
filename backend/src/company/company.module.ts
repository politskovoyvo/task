import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { companyProviders } from './company.provider';
import { UserService } from '../user/user.service';
import { userProvider } from '../user/user.provider';
import { UserCompanyModule } from '../links/user-company/user-company.module';
import { GateWayService } from '../core/notiffication/gate-way.service';

@Module({
    controllers: [CompanyController],
    imports: [UserCompanyModule],
    exports: [CompanyService],
    providers: [
        CompanyService,
        UserService,
        ...userProvider,
        ...companyProviders,
    ],
})
export class CompanyModule {}
