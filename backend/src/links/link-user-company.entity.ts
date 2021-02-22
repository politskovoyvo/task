import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { CompanyEntity } from '../company/entities/company.entity';
import { UserEntity } from '../user/entities/user.entity';

@Table
export class LinkUserCompanyEntity extends Model<LinkUserCompanyEntity> {
  @ForeignKey(() => UserEntity)
  @Column
  userId: number;

  @ForeignKey(() => CompanyEntity)
  @Column
  companyId: number;
}
