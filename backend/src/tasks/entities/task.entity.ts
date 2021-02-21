import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Base, SpendTime } from '../dto/task.dto';

@Table
export class TaskEntity extends Model<TaskEntity> {
  @Column
  type: string;

  @Column
  color: string;

  @Column
  symbol: string;

  @Column
  priorityId: number;

  @Column
  boardId: number;

  @Column({ allowNull: true })
  description: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  assigneeUserId: number; // TODO: ???

  @Column({ type: DataType.ARRAY(DataType.JSON) })
  performers: Base[];

  @Column
  spendTime: string;

  @Column({ type: DataType.ARRAY(DataType.JSON) })
  historyId: History[];

  @Column({ type: DataType.ARRAY(DataType.JSON) })
  histories: SpendTime[];
}
