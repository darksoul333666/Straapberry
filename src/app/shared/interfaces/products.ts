import { CATEGORY_PRODUCTS_ID, CATEGORY_PRODUCTS_NAME } from "../constants/products.enum";

export interface IProduct {
    id: string;
    name: string;
    price: number;
    description: string;
    category: ICategory;
    image: string;
}

export interface ICategory {
    name: CATEGORY_PRODUCTS_NAME;
    id: CATEGORY_PRODUCTS_ID;
}