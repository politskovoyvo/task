import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from '../../user/entities/user.entity';
import { LinkUserBoardEntity } from '../../links/link-user-board.entity';

@Table
export class BoardEntity extends Model<BoardEntity> {
  @Column
  name: string;

  @Column
  symbol: string;

  @BelongsToMany(() => UserEntity, () => LinkUserBoardEntity)
  users: UserEntity[];
}
