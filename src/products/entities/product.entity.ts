// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
import { Schema, SchemaFactory } from '@nestjs/mongoose';
// Document adds all the necessary functionality to work with mongodb.
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  productName: string;
  productDescription: string;
  productPrice: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
