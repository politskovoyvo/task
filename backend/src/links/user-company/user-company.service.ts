import { Inject, Injectable } from '@nestjs/common';
import { USER_COMPANY_REPOSITORY } from './user-company.provider';
import { UserCompanyEntity } from './user-company.entity';

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
            where: { userId } && { companyId },
        });
    }
}
