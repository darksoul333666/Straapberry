import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IProduct } from '../interfaces/products';
import { ICartProduct } from '../interfaces/cart';
import { CATEGORY_PRODUCTS_NAME, CATEGORY_PRODUCTS_ID } from '../constants/products.enum';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private CART_KEY = 'cart';
  private _storage: Storage | null = null;

  private initialProducts: ICartProduct[] = [
    {
      id: '1',
      name: 'Product 1',
      price: 100,
      description: 'Product 1 description',
      category: {
        name: CATEGORY_PRODUCTS_NAME.ACCESSORIES,
        id: CATEGORY_PRODUCTS_ID.ACCESSORIES
      },
      image: 'https://ocelot.com.mx/wp-content/uploads/2023/04/teclado-mecanico-switch-rojo-1024x677.jpg',
      quantity: 1
    },
    {
      id: '2',
      name: 'Product 2',
      price: 100,
      description: 'Product 2 description',
      category: {
        name: CATEGORY_PRODUCTS_NAME.ACCESSORIES,
        id: CATEGORY_PRODUCTS_ID.ACCESSORIES
      },
      image: 'https://ocelot.com.mx/wp-content/uploads/2023/04/teclado-mecanico-switch-rojo-1024x677.jpg',
      quantity: 1
    },
    {
      id: '3',
      name: 'Product 3',
      price: 100,
      description: 'Product 3 description',
      category: {
        name: CATEGORY_PRODUCTS_NAME.ACCESSORIES,
        id: CATEGORY_PRODUCTS_ID.ACCESSORIES
      },
      image: 'https://ocelot.com.mx/wp-content/uploads/2023/04/teclado-mecanico-switch-rojo-1024x677.jpg',
      quantity: 1
    },
    {
      id: '4',
      name: 'Product 4',
      price: 100,
      description: 'Product 4 description',
      category: {
        name: CATEGORY_PRODUCTS_NAME.ACCESSORIES,
        id: CATEGORY_PRODUCTS_ID.ACCESSORIES
      },
      image: 'https://ocelot.com.mx/wp-content/uploads/2023/04/teclado-mecanico-switch-rojo-1024x677.jpg',
      quantity: 1
    },
    {
      id: '5',
      name: 'Product 5',
      price: 100,
      description: 'Product 5 description',
      category: {
        name: CATEGORY_PRODUCTS_NAME.ACCESSORIES,
        id: CATEGORY_PRODUCTS_ID.ACCESSORIES
      },
      image: 'https://ocelot.com.mx/wp-content/uploads/2023/04/teclado-mecanico-switch-rojo-1024x677.jpg',
      quantity: 1
    },
    {
      id: '6',
      name: 'Product 6',
      price: 100,
      description: 'Product 6 description',
      category: {
        name: CATEGORY_PRODUCTS_NAME.ACCESSORIES,
        id: CATEGORY_PRODUCTS_ID.ACCESSORIES
      },
      image: 'https://ocelot.com.mx/wp-content/uploads/2023/04/teclado-mecanico-switch-rojo-1024x677.jpg',
      quantity: 1
    }
  ];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    // await this._storage.set(this.CART_KEY, JSON.stringify(this.initialProducts));
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
