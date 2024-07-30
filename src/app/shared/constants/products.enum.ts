import { ICategory } from "../interfaces/products"

export enum CATEGORY_PRODUCTS_NAME {
    ELECTRONICS = 'Electronicos',
    CLOTHES = 'Ropa',
    CLEANING = 'Limpieza',
    ACCESSORIES = 'Accesorios',
    PHONES = 'Celulares',
    TABLETS = 'Tablets',
    COMPUTATORS = 'Computadores'
}

export enum CATEGORY_PRODUCTS_ID {
    ELECTRONICS = 1,
    CLOTHES = 2,
    CLEANING = 3,
    ACCESSORIES = 4,
    PHONES = 5,
    TABLETS = 6,
    COMPUTATORS = 7
}

export const CATEGORIES = Object.entries(CATEGORY_PRODUCTS_NAME).map((category): ICategory => {
    return { name: category[1], id: CATEGORY_PRODUCTS_ID[category[0] as keyof typeof CATEGORY_PRODUCTS_ID] }
})

export enum ErrorProducts {
    PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
    ERROR_CREATE_PRODUCT = 'ERROR_CREATE_PRODUCT',
    ERROR_UPDATE_PRODUCT = 'ERROR_UPDATE_PRODUCT'
}

export const ERRORS_MESSAGE = {
    [ErrorProducts.PRODUCT_NOT_FOUND] : 'El producto no existe.',
    [ErrorProducts.ERROR_CREATE_PRODUCT]: 'Hubo un error al crear el producto 😕',
    [ErrorProducts.ERROR_UPDATE_PRODUCT]: 'Hubo un error al actualizar el producto 😕'
}

export const SUCCESS_MESSAGE = {
    SUCCESS_CREATE_PRODUCT: 'Producto creado correctamente! 🎉',
    SUCCESS_UPDATE_PRODUCT: 'Producto actualizado correctamente! 🎉'
}