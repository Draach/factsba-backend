import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @Get(':searchTerm')
  findOne(@Param('searchTerm') searchTerm: string) {
    return this.productService.findOne(searchTerm);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Patch(':searchTerm')
  updateProduct(
    @Param('searchTerm') searchTerm: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(searchTerm, updateProductDto);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productService.delete(id);
  }
}
