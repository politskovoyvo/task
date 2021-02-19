import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PriorityEntity {
  @Prop() id: number;
  @Prop() name: string;
  @Prop() color: string;
}

export const PrioritySchema = SchemaFactory.createForClass(PriorityEntity);
