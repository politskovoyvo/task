import { CompanyEntity } from './entities/company.entity';

export const COMPANY_REPOSITORY = 'COMPANY_REPOSITORY';

export const companyProviders = [
  {
    provide: COMPANY_REPOSITORY,
    useValue: CompanyEntity,
  },
];
