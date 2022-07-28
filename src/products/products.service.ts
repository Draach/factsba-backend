import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [
    {
      id: uuid(),
      productName: 'Product 1',
      productDescription: 'Product 1 description',
      productPrice: '100',
      productImage: 'https://via.placeholder.com/150',
    },
    {
      id: uuid(),
      productName: 'Product 2',
      productDescription: 'Product 2 description',
      productPrice: '200',
      productImage: 'https://via.placeholder.com/150',
    },
  ];

  public findAll(): Product[] {
    return this.products;
  }

  public findOneById(id: string): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  public create(createProductDto: CreateProductDto) {
    const product: Product = {
      id: uuid(),
      ...createProductDto,
    };

    this.products.push(product);
    return product;
  }
}
