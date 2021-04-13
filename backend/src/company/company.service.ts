import { Inject, Injectable } from '@nestjs/common';
import { CompanyEntity } from './entities/company.entity';
import { CompanyDto } from './dto/company.dto';
import { COMPANY_REPOSITORY } from './company.provider';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserCompanyService } from '../links/user-company/user-company.service';

@Injectable()
export class CompanyService {
    constructor(
        @Inject(COMPANY_REPOSITORY)
        private readonly _companyRepository: typeof CompanyEntity,
        private readonly _userService: UserService,
        private readonly _userCompanyService: UserCompanyService,
    ) {}

    async create(user: CompanyDto): Promise<CompanyEntity> {
        // @ts-ignore
        return await this._companyRepository.create<CompanyEntity>(user);
    }

    async getCompany(id: number) {
        return this._companyRepository.findOne({ where: { id } });
    }

    async getCompaniesByIds(ids: number[]) {
        return this._companyRepository.findAll({
            include: ['users'],
            where: { id: ids },
        });
    }

    async getUsers(id: number): Promise<{ id: number; name: string }[]> {
        const users = await this._userCompanyService.usersByCompanyIdIsWorking(
            id,
        );
        return users
            .map((i) => i.user)
            ?.map((i) => ({
                id: i.id,
                name: `${i.firstName} ${i.middleName} ${i.lastName}`,
            }));
    }

    async getAll(): Promise<CompanyEntity[]> {
        return this._companyRepository.findAll<CompanyEntity>();
    }

    async addUser(createUserDto: CreateUserDto) {
        const link = await this._userCompanyService.getUserCompanyLink(
            createUserDto.userId,
            createUserDto.companyId,
        );

        if (link) {
            if (!link.history) {
                link.history = [
                    {
                        dt: new Date().toDateString(),
                        isWork: true,
                        reason: '',
                    },
                ];
            } else {
                link.history = [
                    ...link.history,
                    {
                        dt: new Date().toDateString(),
                        isWork: true,
                        reason: '',
                    },
                ];
            }

            link.isWork = true;

            await link.save();
            return;
        }

        const company = await this._companyRepository.findOne({
            where: { id: createUserDto.companyId },
            include: ['users'],
        });
        const user = await this._userService.getUser(createUserDto.userId);
        user.companies.push(company);
        await user.$set('companies', user.companies);
    }
}
