import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CATEGORY_PRODUCTS_ID, ErrorProducts } from '../constants/products.enum';
import { IProduct } from '../interfaces/products';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _storage: Storage | null = null;
  private PRODUCTS_KEY = 'products';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async createProduct(product: IProduct): Promise<void> {
    const products = await this.getProducts();
    products.push({...product, id: uuidv4()});
    await this._storage?.set(this.PRODUCTS_KEY, JSON.stringify(products));
  }

  async editProduct(updatedProduct: IProduct): Promise<void> {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index == -1)  throw new Error(ErrorProducts.PRODUCT_NOT_FOUND);
      products[index] = updatedProduct;
      await this._storage?.set(this.PRODUCTS_KEY, JSON.stringify(products));
  }

  async getProducts(): Promise<IProduct[]> {
    const products = await this._storage?.get(this.PRODUCTS_KEY);
    return products ? JSON.parse(products) : [];
  }

  async getProductsByCategory(category: CATEGORY_PRODUCTS_ID): Promise<IProduct[]> {
    const products = await this.getProducts();
    return products.filter(product => product.category === category);
  }

  async getProductById(id: string): Promise<IProduct | null> {
    const products = await this.getProducts();
    return products.find(product => product.id === id) || null;
  }

  async deleteProduct(id: string): Promise<void> {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index == -1)  throw new Error(ErrorProducts.PRODUCT_NOT_FOUND);
    products.splice(index, 1);
    await this._storage?.set(this.PRODUCTS_KEY, JSON.stringify(products));
  }
}
