import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BaseEntity extends Document {
  @Prop()
  id: number;

  @Prop()
  name: string;
}

export const BaseSchema = SchemaFactory.createForClass(BaseEntity);
