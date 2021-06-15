import {
    Body,
    Controller,
    Get,
    Header,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Query,
    Req,
    Request,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Cookies, CookieSettings, SetCookies } from '@nestjsplus/cookies';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyEntity } from './entities/company.entity';
import { Observable, of } from 'rxjs';
import { SearchUserDto } from './dto/search-user.dto';
import { UserCompanyService } from '../links/user-company/user-company.service';
import { InviteUserDto } from './dto/invite-user.dto';

@ApiTags('Company API')
@Controller('company')
export class CompanyController {
    companyId: number;

    constructor(
        private readonly _companyService: CompanyService,
        private readonly _userCompanyService: UserCompanyService,
    ) {}

    @ApiOperation({ summary: 'Пригласить юзера в компанию' })
    @Get('invite-user')
    inviteUser(@Body() inviteDto: InviteUserDto) {
        this._companyService.inviteNewUser(inviteDto);
    }

    @ApiOperation({ summary: 'Получить  список всех компаний' })
    @ApiResponse({ status: 200, type: [CompanyEntity] })
    @Get('all')
    getAll() {
        return this._companyService.getAll();
    }

    @ApiOperation({ summary: 'Количество user в компании' })
    @ApiResponse({ status: 200, type: Number })
    @Get('user-count/:id')
    getUserCountByCompanyId(
        @Param('id') companyId: number,
    ): Observable<number> {
        return this._companyService.getUserCountByCompanyId(companyId);
    }

    @ApiOperation({ summary: 'Поиск сотрудников в компании' })
    @ApiResponse({ status: 200, type: [SearchUserDto] })
    @Get('search-users')
    searchUsersByCompanyId(
        @Query('query') query: string,
        @Query('companyId') companyId: number,
    ): Observable<SearchUserDto[]> {
        return this._companyService.searchUsers(query, companyId);
    }

    @ApiOperation({ summary: 'Получить список всех компаний' })
    @ApiResponse({ status: 200, type: [CompanyDto] })
    @Get('all')
    getCompanies(): Promise<CompanyDto[]> {
        return this._companyService.getCompanies();
    }

    @ApiOperation({ summary: 'Получить список пользователей по id компании' })
    @Get('users/:id')
    getUsers(
        @Param() params,
        @Req() request: Request,
    ): Promise<{ id: number; name: string }[]> {
        return this._companyService.getUsers(+params.id);
    }

    /**
     * Set-cookie value 'companyId' to client
     */
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
                    secure: true,
                },
            } as CookieSettings,
        ];
    }

    @Post('remove-company')
    async removeCompanyLink(
        @Body()
        body: { userId: number; companyId: number; reason: string; dt: string },
        @Req() request,
    ) {
        this._userCompanyService
            .removeUserFromCompany(body.userId, body.companyId, body.reason)
            .subscribe();
    }

    /**
     * Get company by send cookie company id
     */
    @Get('select')
    getSelectedCompany(@Cookies() cookies) {
        const id = cookies.companyId || undefined;
        if (!id) {
            return null;
        }

        return this._companyService.getCompany(id);
    }

    /**
     * Create company
     * @param company Object company dto
     */
    @Post('add')
    create(@Body() company: CompanyDto) {
        return this._companyService.create(company);
    }

    /**
     * Add user to company (create link db userId-companyId)
     * @param createUserDto user and companyId
     */
    @Post('user/add')
    async addUser(@Body() createUserDto: CreateUserDto) {
        await this._companyService.addUser(createUserDto);
    }
}
