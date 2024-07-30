import { IProduct } from '../interfaces/products';

export interface ICartProduct extends IProduct {
  quantity: number;
}
