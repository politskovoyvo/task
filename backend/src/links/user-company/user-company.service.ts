import { Inject, Injectable } from '@nestjs/common';
import { USER_COMPANY_REPOSITORY } from './user-company.provider';
import { UserCompanyEntity } from './user-company.entity';
import { Op } from 'sequelize';

@Injectable()
export class UserCompanyService {
    constructor(
        @Inject(USER_COMPANY_REPOSITORY)
        private readonly _LinkUserCompanyRepository: typeof UserCompanyEntity,
    ) {}

    async getUserCompanyLink(
        userId: number,
        companyId: number,
    ): Promise<UserCompanyEntity> {
        return this._LinkUserCompanyRepository.findOne<UserCompanyEntity>({
            where: { userId, companyId },
        });
    }

    async usersByCompanyIdIsWorking(companyId: number | number[]) {
        const users = this._LinkUserCompanyRepository.findAll({
            where: {
                companyId,
                [Op.or]: [{ isWork: true }, { isWork: null }],
            },
            include: ['user', 'company'],
        });

        return await users;
    }

    async getCompaniesByUserId(userId: number) {
        return this._LinkUserCompanyRepository.findAll<UserCompanyEntity>({
            include: ['company'],
            where: {
                userId,
                [Op.or]: [{ isWork: true }, { isWork: null }],
            },
        });
    }

    async getLinks(userId: number, companyId: number, isWork = true) {}
}
