import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  /*
  public findAll(): Product[] {
    return this.products;
  }
*/
  async findOneById(searchTerm: string) {
    let product: Product;

    if (isValidObjectId(searchTerm)) {
      product = await this.productModel.findById(searchTerm);
    }

    if (!product) {
      product = await this.productModel.findOne({
        name: searchTerm.toLowerCase().trim(),
      });
    }

    if (!product)
      throw new NotFoundException(
        `Product with id or name "${searchTerm}" not found`,
      );

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    createProductDto.name = createProductDto.name.toLocaleLowerCase();
    try {
      const product = await this.productModel.create(createProductDto);
      return product;
    } catch (error) {
      // Error 11000 means duplicate key error
      if (error.code === 11000) {
        throw new BadRequestException(
          `Product already exists ${JSON.stringify(error.keyValue)}`,
        );
      }
      throw new InternalServerErrorException(
        `Can't create product - Check server logs`,
      );
    }
  }
  /*
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
    //TODO: Reevaluate using this algorithm:
    //const updatedProduct: Product = {
      //...product,
      //...updateProductDto,
      //id,
    //};

    //const index = this.products.indexOf(product);
    //this.products[index] = updatedProduct;

    //return updatedProduct;  
  }

  delete(id: string) {
    this.findOneById(id);
    this.products = this.products.filter((p) => p.id !== id);
  }

  fillProductsWithSeedData(products: Product[]) {
    this.products = products;
  }
  */
}
