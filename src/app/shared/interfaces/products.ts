import { CATEGORY_PRODUCTS } from "../constants/products.enum";

export interface IProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    category: CATEGORY_PRODUCTS;
    image: string;
}