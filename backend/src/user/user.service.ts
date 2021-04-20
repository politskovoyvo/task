import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from './user.provider';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { from, Observable } from 'rxjs';
import { CompanyDto } from '../company/dto/company.dto';
import { map, switchMap } from 'rxjs/operators';
import { UserCompanyService } from '../links/user-company/user-company.service';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly _userRepository: typeof UserEntity,
        private readonly _userCompanyService: UserCompanyService,
    ) {}

    async create(user: UserDto): Promise<UserEntity> {
        // @ts-ignore
        return await this._userRepository.create<UserEntity>(user);
    }

    async getAll(): Promise<UserEntity[]> {
        return this._userRepository.findAll<UserEntity>();
    }

    getCompanies(userId: number, companyId: number): Observable<CompanyDto[]> {
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
                            isSelected: newCompanyObj.id === companyId,
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
    }

    getUser(id: number): Promise<UserEntity> {
        return this._userRepository.findOne({
            where: { id },
            include: ['companies'],
        });
    }
}
