import { Inject, Injectable } from '@nestjs/common';
import { USER_COMPANY_REPOSITORY } from './user-company.provider';
import { UserCompanyEntity } from './user-company.entity';
import { Op } from 'sequelize';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
        return await this._LinkUserCompanyRepository.findAll({
            where: {
                companyId,
                [Op.or]: [{ isWork: true }, { isWork: null }],
            },
            include: ['user', 'company'],
        });
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

    removeUserFromCompany(
        userId: number,
        companyId: number,
        reason: string,
    ): Observable<UserCompanyEntity> {
        const link$ = this.getUserCompanyLink(userId, companyId);

        return from(link$).pipe(
            tap((link) => {
                if (!link.history) {
                    link.history = [
                        {
                            dt: new Date().toDateString(),
                            isWork: false,
                            reason,
                        },
                    ];
                } else {
                    link.history = [
                        ...link.history,
                        {
                            dt: new Date().toDateString(),
                            isWork: false,
                            reason,
                        },
                    ];
                }

                link.isWork = false;

                link.save();
            }),
        );
    }

    async getLinks(userId: number, companyId: number, isWork = true) {}
}
