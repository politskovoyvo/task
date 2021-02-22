import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { CompanyEntity } from '../../company/entities/company.entity';
import { LinkUserCompanyEntity } from '../../links/link-user-company.entity';
import { LinkUserBoardEntity } from '../../links/link-user-board.entity';
import { BoardEntity } from '../../board/entities/board.entity';

@Table
export class UserEntity extends Model<UserEntity> {
  @Column({ allowNull: false })
  firstName: string;

  @Column({ allowNull: false })
  lastName: string;

  @Column({ allowNull: false })
  middleName: string;

  @Column({ allowNull: false })
  email: string;

  @BelongsToMany(() => CompanyEntity, () => LinkUserCompanyEntity)
  companies: CompanyEntity[];

  @BelongsToMany(() => BoardEntity, () => LinkUserBoardEntity)
  boards: BoardEntity[];
}
