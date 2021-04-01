import { Module } from '@nestjs/common';
import { UserCompanyService } from './user-company.service';
import { linkUserCompanyProviders } from './user-company.provider';

@Module({
    controllers: [],
    imports: [],
    exports: [UserCompanyService],
    providers: [UserCompanyService, ...linkUserCompanyProviders],
})
export class UserCompanyModule {}
