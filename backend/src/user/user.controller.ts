import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { TokenService } from '../share/services/token.service';
import { Cookies } from '@nestjsplus/cookies';
import { CompanyDto } from '../company/dto/company.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly _userService: UserService,
    private readonly _tokenService: TokenService,
  ) {}

  @Post('add')
  async createUser(@Body() userDto: UserDto) {
    return await this._userService.create(userDto);
  }

  @Get()
  async getUserById(@Query('id') id) {
    return await this._userService.getUser(id);
  }

  @Get('companies')
  async companies(@Req() request, @Cookies() cookies): Promise<CompanyDto[]> {
    const companyId = cookies?.companyId || 0;
    const userId = this._tokenService.getDecodedAccessToken(
      request.headers.authorization,
    ).id;

    const user = await this._userService.getUser(userId);
    return (
      user.companies?.map(
        (c) =>
          ({
            id: c.id,
            isSelected: c.id === +companyId,
            name: c.name,
            email: c.email,
            inn: c.inn,
          } as CompanyDto),
      ) || []
    );
  }
}
