import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Base } from '../tasks/dto/task.dto';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly _companyService: CompanyService) {}

  @Get('all')
  getAll() {
    return this._companyService.getAll();
  }

  @Post('add')
  create(@Body() company: CompanyDto) {
    return this._companyService.create(company);
  }

  @Post('user/add')
  async addUser(@Query('id') userId: number) {
    await this._companyService.addUser(userId);
  }
}
