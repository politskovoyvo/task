import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Base } from '../tasks/dto/task.dto';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly _companyService: CompanyService) {}

  @Get('all')
  getAll() {
    return this._companyService.getAll();
  }

  // TODO
  @Get()
  getUsers() {}

  @Post('add')
  create(@Body() company: CompanyDto) {
    return this._companyService.create(company);
  }

  @Post('user/add')
  async addUser(@Body() createUserDto: CreateUserDto) {
    await this._companyService.addUser(createUserDto);
  }
}
