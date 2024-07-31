import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IProduct } from '../interfaces/products';
import { ICartProduct } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private CART_KEY = 'cart';
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getCartProducts(): Promise<ICartProduct[]> {
    const products = (await this._storage?.get(this.CART_KEY)) || [];
    if( typeof products  === "string") {
      return JSON.parse(products)
    } else return products
  }

  async addProductToCart(product: IProduct): Promise<void> {
    const cart = await this.getCartProducts();
    const existingProduct = cart.find((p) => p.id === product.id);
    if (existingProduct) {
      return this.increaseProductQuantity(product.id);
    }
    cart.push({ ...product, quantity: 1 });
    await this._storage?.set(this.CART_KEY, cart);
  }

  async increaseProductQuantity(productId: string): Promise<void> {
    const cart = await this.getCartProducts();
    const existingProduct = cart.find((p) => p.id === productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
    }
    await this._storage?.set(this.CART_KEY, cart);
  }

  async decreaseProductQuantity(productId: string): Promise<void> {
    let cart = await this.getCartProducts();
    const productIndex = cart.findIndex((p) => p.id === productId);
    if (productIndex > -1) {
      if (cart[productIndex].quantity > 1) {
        cart[productIndex].quantity -= 1;
      } else {
        cart = cart.filter((p) => p.id !== productId);
      }
    }
    await this._storage?.set(this.CART_KEY, cart);
  }

  async removeProductFromCart(productId: string): Promise<void> {
    const cart = await this.getCartProducts();
    const updatedCart = cart.filter((p) => p.id !== productId);
    await this._storage?.set(this.CART_KEY, updatedCart);
  }

  async getTotal(): Promise<number> {
    const cart = await this.getCartProducts();
    return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }

  async resetCart(): Promise<void> {
    await this._storage?.set(this.CART_KEY, []);
  }

  async getItemsCart(): Promise<number> {
    const cart = await this.getCartProducts();
    return cart.reduce((acc, product) => acc + product.quantity, 0);
  }
}
