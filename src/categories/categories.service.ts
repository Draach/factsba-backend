import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    /*     {
      id: uuid(),
      categoryName: 'Category 1',
      createdAt: new Date().getTime(),
    }, */
  ];
  create(createCategoryDto: CreateCategoryDto) {
    const { categoryName } = createCategoryDto;

    const category: Category = {
      id: uuid(),
      categoryName: categoryName,
      createdAt: new Date().getTime(),
    };

    this.categories.push(category);

    return category;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: string) {
    const category = this.categories.find((c) => c.id === id);
    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);
    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let categoryDB = this.findOne(id);

    this.categories = this.categories.map((category) => {
      if (category.id === id) {
        categoryDB.updatedAt = new Date().getTime();
        categoryDB = { ...categoryDB, ...updateCategoryDto };
        return categoryDB;
      }
      return category;
    });
    return categoryDB;
  }

  delete(id: string) {
    this.categories = this.categories.filter((category) => category.id !== id);
  }

  fillCategoriesWithSeedData(categories: Category[]) {
    this.categories = categories;
  }
}
