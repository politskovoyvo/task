import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Base } from '../tasks/dto/task.dto';

@Controller('company')
export class CompanyController {
  @Get()
  async getCompanies() {}

  // TODO: убрать query, взять и токена
  @Post()
  async addEmployee(@Query('id') companyId: number, @Body() employee: Base) {}
}
