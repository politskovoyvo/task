import { UserCompanyEntity } from './user-company.entity';

export const USER_COMPANY_REPOSITORY = 'LINK_USER_COMPANY_PROVIDER';

export const linkUserCompanyProviders = [
    {
        provide: USER_COMPANY_REPOSITORY,
        useValue: UserCompanyEntity,
    },
];
