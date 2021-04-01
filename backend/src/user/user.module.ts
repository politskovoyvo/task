import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProvider } from './user.provider';
import { TokenService } from '../share/services/token.service';
import { CompanyModule } from '../company/company.module';
import { UserCompanyModule } from '../links/user-company/user-company.module';
import { UserCompanyService } from '../links/user-company/user-company.service';

@Module({
    controllers: [UserController],
    imports: [CompanyModule, UserCompanyModule],
    exports: [UserService],
    providers: [UserService, TokenService, ...userProvider],
})
export class UserModule {}
