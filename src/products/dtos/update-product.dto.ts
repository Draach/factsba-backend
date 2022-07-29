import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;
  @IsString()
  @IsOptional()
  readonly productName?: string;
  @IsString()
  @IsOptional()
  readonly productDescription?: string;
  @IsString()
  @IsOptional()
  readonly productPrice?: string;
  @IsString()
  @IsOptional()
  readonly productImage?: string;
}
