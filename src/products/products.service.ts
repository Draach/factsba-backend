import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    /*     {
      id: uuid(),
      productName: 'Product 1',
      productDescription: 'Product 1 description',
      productPrice: '100',
      productImage: 'https://via.placeholder.com/150',
    }, */
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

  update(id: string, updateProductDto: UpdateProductDto) {
    let productDB = this.findOneById(id);

    if (updateProductDto.id && updateProductDto.id !== id)
      throw new BadRequestException(`Product id is not valid inside body`);

    this.products = this.products.map((product) => {
      if (product.id === id) {
        productDB = {
          ...productDB,
          ...updateProductDto,
          id,
        };
        return productDB;
      }
      return product;
    });
    return productDB;
    /* TODO: Reevaluate using this algorithm:
    const updatedProduct: Product = {
      ...product,
      ...updateProductDto,
      id,
    };

    const index = this.products.indexOf(product);
    this.products[index] = updatedProduct;

    return updatedProduct;*/
  }

  delete(id: string) {
    this.findOneById(id);
    this.products = this.products.filter((p) => p.id !== id);
  }

  fillProductsWithSeedData(products: Product[]) {
    this.products = products;
  }
}
