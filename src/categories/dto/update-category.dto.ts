// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCategoryDto } from './create-category.dto';

import { IsString, MinLength } from 'class-validator';

// export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
export class UpdateCategoryDto {
  @IsString()
  @MinLength(3)
  categoryName: string;
}
