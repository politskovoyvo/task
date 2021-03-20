import {
    Body,
    Controller,
    Get,
    Header,
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

@Controller('company')
export class CompanyController {
    companyId: number;

    constructor(private readonly _companyService: CompanyService) {}

    @Get('all')
    getAll() {
        return this._companyService.getAll();
    }

    @Get('users/:id')
    getUsers(@Param() params, @Req() request: Request): string {
        return params.id;
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
