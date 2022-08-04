import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 20, offset = 0 } = paginationDto;
    return await this.categoryModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ name: 1 })
      .select('-__v');
  }

  async findOne(searchTerm: string) {
    let category: Category;

    if (isValidObjectId(searchTerm)) {
      category = await this.categoryModel.findById(searchTerm);
    }
    if (!category) {
      category = await this.categoryModel.findOne({
        name: searchTerm.toLowerCase().trim(),
      });
    }
    if (!category)
      throw new NotFoundException(
        `Category with id or name "${searchTerm}" not found`,
      );

    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    createCategoryDto.name = createCategoryDto.name.toLocaleLowerCase();
    createCategoryDto.createdAt = new Date();
    try {
      const category = await this.categoryModel.create(createCategoryDto);
      return category;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(searchTerm: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(searchTerm);
    if (updateCategoryDto.name)
      updateCategoryDto.name = updateCategoryDto.name.toLocaleLowerCase();
    updateCategoryDto.updatedAt = new Date();
    try {
      await category.updateOne(updateCategoryDto, { new: true });

      return { ...category.toJSON(), ...updateCategoryDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async delete(id: string) {
    const { deletedCount } = await this.categoryModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Category with id "${id}" not found`);
    }
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Category already exists ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Category - Check server logs`,
    );
  }
}
