import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { CompanyEntity } from '../company/entities/company.entity';
import { UserEntity } from '../user/entities/user.entity';
import { BoardEntity } from '../board/entities/board.entity';

@Table
export class LinkUserBoardEntity extends Model<LinkUserBoardEntity> {
  @ForeignKey(() => UserEntity)
  @Column
  userId: number;

  @ForeignKey(() => BoardEntity)
  @Column
  boardId: number;
}
