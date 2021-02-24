import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  CookieOptions,
  CookieSettings,
  SetCookies,
  SignedCookies,
} from '@nestjsplus/cookies';

@Controller('company')
export class CompanyController {
  companyId: number;

  constructor(private readonly _companyService: CompanyService) {}

  @Get('all')
  getAll() {
    return this._companyService.getAll();
  }

  @Get('users/:id')
  getUsers(@Param() params, @Req() request: Request): string {
    return params.id;
    // return this._companyService.getUsers(id);
  }

  @Get('set/:id')
  @SetCookies()
  companySet(@Request() request, @Param('id') companyId: number) {
    request._cookies = [
      {
        name: 'companyId',
        value: companyId.toString(),
        options: {
          httpOnly: true,
          sameSite: 'none',
          // secure: true,
          // signed: false,
        },
      } as CookieSettings,
    ];

    return 'успех';
  }

  @Post('add')
  create(@Body() company: CompanyDto) {
    return this._companyService.create(company);
  }

  @Post('user/add')
  async addUser(@Body() createUserDto: CreateUserDto) {
    await this._companyService.addUser(createUserDto);
  }
}
