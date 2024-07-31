import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { addCircle, trashBin } from 'ionicons/icons';
import { BehaviorSubject } from 'rxjs';
import { ROUTES } from 'src/app/shared/constants/routes';
import { IProduct } from 'src/app/shared/interfaces/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-client-favorites',
  templateUrl: './client-favorites.component.html',
  styleUrls: ['./client-favorites.component.scss'],
})
export class ClientFavoritesComponent {
  public favoriteProductsByCategory = new BehaviorSubject<CategoryProductsTuple[]>([]);
  public totalItemsInCart = new BehaviorSubject<number>(0);
  constructor(
    private readonly productsService: ProductService,
    private readonly cartService: CartService,
    private readonly router: Router
  ) { 
    addIcons({
      trashBin,
      addCircle
    })
  }

  /** 
  * ionViewWillEnter is lifecycle hook, call getFavoritesProducts whenever the view is entered
  * @return {void}
  */
  public async ionViewWillEnter(): Promise<void> {
    await this.getFavoritesProducts();
    await this.getItemsCart();
  }

  /** 
  * @function getFavoritesProducts
  * @description get favorites products from products service, group them by category, 
  * and set them in favoriteProductsByCategory
  * @return {void}
  */
  public async getFavoritesProducts(): Promise<void> {
    const products = await this.productsService.getProductsFavorites();
    const productsByCategory: CategoryProductsTuple[] = Object.entries(products).map(([key, value]: [string, IProduct[]]) => {
      return [key, value];
    });
    this.favoriteProductsByCategory.next(productsByCategory);
  }
  /**
  * @function addToCart
  * @description add product to cart, from products service, next call getItemsCart
  * @param {IProduct} product
  * @return {void}
  */
  public async addToCart(product: IProduct): Promise<void> {
    await this.cartService.addProductToCart(product);
    await this.getItemsCart();
  }

  /**
  * @function removeFromFavorites
  * @description remove product from favorites, from products service, next call getFavoritesProducts
  * @param {IProduct} product
  * @return {void}
  */
  public async removeFromFavorites(product: IProduct): Promise<void> {
    await this.productsService.addOrRemoveProductToFavorites(product);
    await this.getFavoritesProducts();
  }

  /**
  * @function goToCart
  * @description navigate to shopping cart
  * @return {void}
  */
  public goToCart(): void {
    this.router.navigate([ROUTES.SHOPPING_CART]);
  }

  /**
  * @function getItemsCart
  * @description get items in cart, from cart service, next set totalItemsInCart
  * @return {void}
  */
  public async getItemsCart(): Promise<void> {
    this.totalItemsInCart.next(await this.cartService.getItemsCart());
  }

}

/**
* @interface CategoryProductsTuple
* @description interface for categoryProductsTuple
* @type {string}
* @type {IProduct[]}
*/
export type CategoryProductsTuple = [string, IProduct[]];

