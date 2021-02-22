import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('add')
  async createUser(@Body() userDto: UserDto) {
    return await this._userService.create(userDto);
  }

  @Get()
  async getUserById(@Query('id') id) {
    return await this._userService.getUser(id);
  }
}
