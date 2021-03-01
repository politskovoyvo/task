import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from '../../user/entities/user.entity';
import { LinkUserCompanyEntity } from '../../links/link-user-company.entity';

@Table
export class CompanyEntity extends Model<CompanyEntity> {
  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  inn: string;

  @Column({ allowNull: false })
  email: string;

  @BelongsToMany(() => UserEntity, () => LinkUserCompanyEntity)
  users: UserEntity[];

  isSelected: boolean;
}
