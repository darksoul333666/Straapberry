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

  public async ionViewWillEnter() {
    await this.getFavoritesProducts();
    await this.getItemsCart();
  }

  public async getFavoritesProducts(): Promise<void> {
    const products = await this.productsService.getProductsFavorites();
    const productsByCategory: CategoryProductsTuple[] = Object.entries(products).map(([key, value]: [string, IProduct[]]) => {
      return [key, value];
    });
    this.favoriteProductsByCategory.next(productsByCategory);
  }

  public async addToCart(product: IProduct): Promise<void> {
    await this.cartService.addProductToCart(product);
    await this.getItemsCart();
  }

  public async removeFromFavorites(product: IProduct): Promise<void> {
    await this.productsService.addOrRemoveProductToFavorites(product);
    await this.getFavoritesProducts();
  }

  public goToCart(): void {
    this.router.navigate([ROUTES.SHOPPING_CART]);
  }

  public async getItemsCart(): Promise<void> {
    this.totalItemsInCart.next(await this.cartService.getItemsCart());
  }

}

export type CategoryProductsTuple = [string, IProduct[]];

