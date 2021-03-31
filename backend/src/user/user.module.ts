import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProvider } from './user.provider';
import { TokenService } from '../share/services/token.service';
import { CompanyModule } from '../company/company.module';

@Module({
    controllers: [UserController],
    imports: [CompanyModule],
    exports: [UserService],
    providers: [UserService, TokenService, ...userProvider],
})
export class UserModule {}
