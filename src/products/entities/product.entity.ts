// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// Document adds all the necessary functionality to work with mongodb.
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ unique: true, index: true })
  name: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
