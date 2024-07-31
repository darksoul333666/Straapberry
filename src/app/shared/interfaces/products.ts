import { CATEGORY_PRODUCTS_ID, CATEGORY_PRODUCTS_NAME } from "../constants/products.enum";

export interface IProduct {
    id: string;
    name: string;
    price: number;
    description: string;
    category: ICategory['id'];
    image: string;
}

export interface ICategory {
    name: CATEGORY_PRODUCTS_NAME;
    id: CATEGORY_PRODUCTS_ID;
}

export interface IProductsFavorites {
    [CATEGORY_PRODUCTS_NAME.ACCESSORIES]?: IProduct[];
    [CATEGORY_PRODUCTS_NAME.CLOTHES]?: IProduct[];
    [CATEGORY_PRODUCTS_NAME.COMPUTATORS]?: IProduct[];
    [CATEGORY_PRODUCTS_NAME.CLEANING]?: IProduct[];
    [CATEGORY_PRODUCTS_NAME.ELECTRONICS]?: IProduct[];
    [CATEGORY_PRODUCTS_NAME.PHONES]?: IProduct[];
    [CATEGORY_PRODUCTS_NAME.TABLETS]?: IProduct[];
}