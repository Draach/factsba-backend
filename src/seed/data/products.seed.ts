import { v4 as uuid } from 'uuid';
import { Product } from 'src/products/interfaces/product.interface';

export const PRODUCTS_SEED: Product[] = [
  {
    id: uuid(),
    productName: 'Product 1',
    productDescription: 'Product 1 description',
    productPrice: '100',
    productImage: 'https://via.placeholder.com/150',
  },
  {
    id: uuid(),
    productName: 'Product 2',
    productDescription: 'Product 2 description',
    productPrice: '200',
    productImage: 'https://via.placeholder.com/150',
  },
  {
    id: uuid(),
    productName: 'Product 3',
    productDescription: 'Product 3 description',
    productPrice: '300',
    productImage: 'https://via.placeholder.com/150',
  },
];
