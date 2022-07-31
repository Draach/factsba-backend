import { IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @Min(1)
  @IsPositive()
  price: number;
}
