import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class UserEntity extends Model<UserEntity> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  middleName: string;

  @Column
  email: string;

  // TODO: GET KEY
  @Column
  companyId: number;
}
