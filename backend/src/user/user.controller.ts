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
import { CompanyEntity } from '../company/entities/company.entity';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserCompanyEntity } from '../links/user-company/user-company.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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
        // const userId = this._tokenService.getDecodedAccessToken(
        //     request.headers.authorization,
        // )?.id;

        const userId = 4;

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

        link.isWork = false;

        await link.save();

        return link;
    }

    @Get()
    async getUserById(@Query('id') id) {
        return await this._userService.getUser(id);
    }

    @ApiOperation({ summary: 'Список компаний, в которых работает user' })
    @ApiResponse({ status: 200, type: [CompanyDto] })
    @Get('companies')
    companies(@Req() request, @Cookies() cookies): Observable<CompanyDto[]> {
        const requestCookieCompanyId = cookies?.companyId || 0;
        const userId = this._tokenService.getDecodedAccessToken(
            request.headers.authorization,
        ).id;

        return from(this._userCompanyService.getCompaniesByUserId(userId)).pipe(
            switchMap((userCompanies) => {
                const ids = userCompanies.map((uc) => uc.companyId);
                return this._userCompanyService.usersByCompanyIdIsWorking(ids);
            }),
            map((userCompanyLinks) => {
                return userCompanyLinks.reduce((acc, v, ind, list) => {
                    const company = acc.find((c) => c.id === v.companyId);

                    if (!company) {
                        const newCompanyObj = v.company;
                        acc.push({
                            id: newCompanyObj.id,
                            isSelected:
                                newCompanyObj.id === +requestCookieCompanyId,
                            name: newCompanyObj.name,
                            email: newCompanyObj.email,
                            inn: newCompanyObj.inn,
                            userCount:
                                list.filter(
                                    (i) =>
                                        (i.isWork || i.isWork == null) &&
                                        i.companyId === newCompanyObj.id,
                                )?.length || 0,
                        });
                        return acc;
                    } else {
                        return acc;
                    }
                }, []);
            }),
        );

        // const companies = user?.companies;eee

        // if (!companyIds) {
        //     return [];
        // }
        //
        // return this._userCompanyService
        //     .getCompaniesByUserId(userId)
        //     .then((links) => {
        //         const companies = links.map((c) => c.company)?.map((c) => c.id);
        //
        //         return this._companyService.getCompaniesByIds(companies);
        //     })
        //     .then((companies) => {
        //         return (
        //             companies?.map(
        //                 (c) =>
        //                     ({
        //                         id: c.id,
        //                         isSelected: c.id === +requestCookieCompanyId,
        //                         name: c.name,
        //                         email: c.email,
        //                         inn: c.inn,
        //                         userCount: c.users?.length || 0,
        //                     } as CompanyDto),
        //             ) || []
        //         );
        //     });
    }
}
