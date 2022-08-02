import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  public findAll() {
    return this.productModel.find();
  }

  async findOne(searchTerm: string) {
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
      this.handleExceptions(error);
    }
  }

  async update(searchTerm: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(searchTerm);
    if (updateProductDto.name)
      updateProductDto.name = updateProductDto.name.toLocaleLowerCase();
    try {
      await product.updateOne(updateProductDto, { new: true });

      return { ...product.toJSON(), ...updateProductDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async delete(id: string) {
    //const result = await this.productModel.findByIdAndDelete(id);
    const { deletedCount } = await this.productModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }

    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Product already exists ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Product - Check server logs`,
    );
  }
}
