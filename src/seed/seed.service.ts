import { Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { ProductsService } from 'src/products/products.service';
import { CATEGORIES_SEED } from './data/categories.seed';
import { PRODUCTS_SEED } from './data/products.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}
  populateDB() {
    this.productsService.fillProductsWithSeedData(PRODUCTS_SEED);
    this.categoriesService.fillCategoriesWithSeedData(CATEGORIES_SEED);
    return 'Seed executed successfully';
  }
}
