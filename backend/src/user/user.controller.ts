import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { TokenService } from '../share/services/token.service';
import { Cookies } from '@nestjsplus/cookies';
import { CompanyDto } from '../company/dto/company.dto';
import { CompanyService } from '../company/company.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly _userService: UserService,
        private readonly _companyService: CompanyService,
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
        const requestCookieCompanyId = cookies?.companyId || 0;
        const userId = this._tokenService.getDecodedAccessToken(
            request.headers.authorization,
        ).id;

        const user = await this._userService.getUser(userId);
        const companyIds = user.companies.map((c) => c.id);
        const companies = await this._companyService.getCompaniesById(
            companyIds,
        );

        return (
            companies?.map((c) => {
                return {
                    id: c.id,
                    isSelected: c.id === +requestCookieCompanyId,
                    name: c.name,
                    email: c.email,
                    inn: c.inn,
                    userCount: c.users?.length || 0,
                } as CompanyDto;
            }) || []
        );
    }
}
