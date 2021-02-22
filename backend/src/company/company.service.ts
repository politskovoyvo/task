import { Inject, Injectable } from '@nestjs/common';
import { CompanyEntity } from './entities/company.entity';
import { CompanyDto } from './dto/company.dto';
import { COMPANY_REPOSITORY } from './company.provider';
import { UserService } from '../user/user.service';
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

  async getAll(): Promise<CompanyEntity[]> {
    return this._companyRepository.findAll<CompanyEntity>();
  }

  async addUser(userId: number) {
    const user = await this._userService.getUser(userId);
    // TODO: Посмотреть и доработать
    const company = await this._companyRepository.findOne({ where: { id: 1 } });
    await user.$set('companies', [company]);
  }
}
