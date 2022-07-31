import {
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  description: string;
  @Min(1)
  @IsPositive()
  price: number;
}
