import { v4 as uuid } from 'uuid';
import { Category } from 'src/categories/entities/category.entity';

export const CATEGORIES_SEED: Category[] = [
  {
    id: uuid(),
    categoryName: 'Category 1',
    createdAt: new Date().getTime(),
  },
  {
    id: uuid(),
    categoryName: 'Category 2',
    createdAt: new Date().getTime(),
  },
];
