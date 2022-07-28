import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  findAll(): Product[] {
    return this.productService.findAll();
  }

  @Get('/:id')
  findOneById(@Param('id', ParseUUIDPipe) id: string): Product {
    return this.productService.findOneById(id);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): CreateProductDto {
    return this.productService.create(createProductDto);
  }
}
