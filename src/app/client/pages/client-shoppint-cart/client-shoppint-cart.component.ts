import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CATEGORY_PRODUCTS_ID, CATEGORY_PRODUCTS_NAME } from 'src/app/shared/constants/products.enum';
import { ROUTES } from 'src/app/shared/constants/routes';
import { ICartProduct } from 'src/app/shared/interfaces/cart';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-client-shoppint-cart',
  templateUrl: './client-shoppint-cart.component.html',
  styleUrls: ['./client-shoppint-cart.component.scss'],
})
export class ClientShoppintCartComponent  implements OnInit {
  public shoppingCart = new BehaviorSubject<ICartProduct[]>([]);

  public totalCart: number = 0;
  constructor(
    private readonly cartService: CartService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.getShoppingCart();
  }

  public async getShoppingCart(): Promise<void> {
    const products = await this.cartService.getCartProducts();
    this.shoppingCart.next(products);
    await this.getTotalCart();
  }

  public async getTotalCart(): Promise<void> {
    this.totalCart = await this.cartService.getTotal();
  }

  public async addOneToProductFromCart(productId: string): Promise<void> {
    await this.cartService.increaseProductQuantity(productId);
    await this.getShoppingCart();
  }

  public async removeOneFromProductFromCart(productId: string): Promise<void> {
    await this.cartService.decreaseProductQuantity(productId);
    await this.getShoppingCart();
  }

  public async removeProductFromCart(productId: string): Promise<void> {
    await this.cartService.removeProductFromCart(productId);
    await this.getShoppingCart();
  }
}
