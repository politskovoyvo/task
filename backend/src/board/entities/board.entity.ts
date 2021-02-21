import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class BoardEntity extends Model<BoardEntity> {
  @Column
  name: string;

  @Column
  symbol: string;
}
