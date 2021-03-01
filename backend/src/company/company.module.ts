import { Module } from '@nestjs/common';
import { UserController } from '../user/user.controller';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { companyProviders } from './company.provider';
import { UserService } from '../user/user.service';
import { userProvider } from '../user/user.provider';

@Module({
  controllers: [CompanyController],
  imports: [],
  exports: [CompanyService],
  providers: [
    CompanyService,
    UserService,
    ...userProvider,
    ...companyProviders,
  ],
})
export class CompanyModule {}
