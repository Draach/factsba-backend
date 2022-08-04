import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ unique: true, index: true })
  categoryName: string;
  @Prop()
  createdAt: number;
  @Prop()
  updatedAt?: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
