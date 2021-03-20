import { Inject, Injectable } from '@nestjs/common';
import { CompanyEntity } from './entities/company.entity';
import { CompanyDto } from './dto/company.dto';
import { COMPANY_REPOSITORY } from './company.provider';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class CompanyService {
    constructor(
        @Inject(COMPANY_REPOSITORY)
        private readonly _companyRepository: typeof CompanyEntity,
        private readonly _userService: UserService,
    ) {}

    async create(user: CompanyDto): Promise<CompanyEntity> {
        // @ts-ignore
        return await this._companyRepository.create<CompanyEntity>(user);
    }

    async getCompany(id: number) {
        return this._companyRepository.findOne({ where: { id } });
    }

    async getUsers(id: number): Promise<UserEntity[]> {
        const companies = await this._companyRepository.findAll({
            where: { id },
            include: ['users'],
        });
        return companies?.map((c) => c.users).reduce((acc, i) => acc.concat(i));
    }

    async getAll(): Promise<CompanyEntity[]> {
        return this._companyRepository.findAll<CompanyEntity>();
    }

    async addUser(createUserDto: CreateUserDto) {
        const company = await this._companyRepository.findOne({
            where: { id: createUserDto.companyId },
            include: ['users'],
        });
        const user = await this._userService.getUser(createUserDto.userId);
        user.companies.push(company);
        await user.$set('companies', user.companies);
    }
}
