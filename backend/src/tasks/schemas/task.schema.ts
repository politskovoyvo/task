import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base, Priority, SpendTime } from '../dto/task.dto';

export type TaskDocument = TaskDb & Document;

@Schema()
export class TaskDb {
  @Prop()
  id: number;

  @Prop()
  type: string;

  @Prop()
  color: string;

  @Prop()
  symbol: string;

  @Prop()
  priority: Priority[];

  @Prop({ type: Object })
  assignee: Base;

  @Prop()
  performers: Base[];

  @Prop()
  spendTime: string;

  @Prop()
  history: History[];

  @Prop()
  info?: string;

  @Prop()
  histories: SpendTime[];
}

export const TaskSchema = SchemaFactory.createForClass(TaskDb);
