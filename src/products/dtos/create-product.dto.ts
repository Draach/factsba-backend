import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly productName: string;
  @IsString()
  readonly productDescription: string;
  @IsString()
  readonly productPrice: string;
  @IsString()
  readonly productImage: string;
}
