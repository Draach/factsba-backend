import { Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}
  @Get()
  async executeSeed() {
    await this.productModel.deleteMany();
    const productsArray: {
      name: string;
      description: string;
      price: number;
    }[] = [];
    for (let i = 0; i < 10; i++) {
      productsArray.push({
        name: `Product ${i}`,
        description: `Description ${i}`,
        price: i * 10,
      });
    }
    this.productModel.insertMany(productsArray);
    return 'Seed executed!';
  }
}
