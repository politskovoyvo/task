import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { TokenService } from '../share/services/token.service';

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
  async companies(@Req() request) {
    // TODO: token
    const userId = this._tokenService.getDecodedAccessToken(
      request.headers.authorization,
    ).id;

    const user = await this._userService.getUser(userId);
    return user.companies || [];
  }
}
