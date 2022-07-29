import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [ProductsModule, CategoriesModule, SeedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
