import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Query,
    Req,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { TokenService } from '../share/services/token.service';
import { Cookies } from '@nestjsplus/cookies';
import { CompanyDto } from '../company/dto/company.dto';
import { CompanyService } from '../company/company.service';
import { UserCompanyService } from '../links/user-company/user-company.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly _userService: UserService,
        private readonly _companyService: CompanyService,
        private readonly _tokenService: TokenService,
        private readonly _userCompanyService: UserCompanyService,
    ) {}

    @Post('add')
    async createUser(@Body() userDto: UserDto) {
        return await this._userService.create(userDto);
    }

    @Post('remove-company')
    async removeCompanyLink(
        @Body() body: { companyId: number; reason: string; dt: string },
        @Req() request,
    ) {
        const userId = this._tokenService.getDecodedAccessToken(
            request.headers.authorization,
        )?.id;

        if (!userId) {
            throw new HttpException('Dont have user id', HttpStatus.NOT_FOUND);
        }

        const link = await this._userCompanyService.getUserCompanyLink(
            userId,
            body.companyId,
        );

        if (!link.history) {
            link.history = [
                {
                    dt: new Date().toDateString(),
                    isWork: false,
                    reason: body.reason,
                },
            ];
        } else {
            link.history = [
                ...link.history,
                {
                    dt: new Date().toDateString(),
                    isWork: false,
                    reason: body.reason,
                },
            ];
        }

        await link.save();

        return link;
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
        const companyIds = user?.companies.map((c) => c.id);

        if (!companyIds) {
            return [];
        }
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
