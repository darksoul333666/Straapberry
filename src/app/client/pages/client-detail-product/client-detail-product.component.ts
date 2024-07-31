import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, heartDislike } from 'ionicons/icons';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-client-detail-product',
  templateUrl: './client-detail-product.component.html',
  styleUrls: ['./client-detail-product.component.scss'],
})
export class ClientDetailProductComponent {
  productId: string = '';
  product = new BehaviorSubject<IProduct | undefined>(undefined);
  public isFavorite: boolean = false;
  constructor(
    private readonly productsService: ProductService,
    private readonly cartService: CartService,
    private readonly route: ActivatedRoute
  ) { 
    addIcons({
      heart,
      heartDislike
    })
  }

  async ionViewWillEnter() {
    this.getIdProduct(this.productId);
    await this.getProduct(this.productId);
    await this.checkIfProductIsFavorite();
  }

  public async getIdProduct(productId: string): Promise<void> {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
  }

  public addOneToProductFromCart(): void {
    this.cartService.addProductToCart(this.product.value as IProduct);
  } 

  public async getProduct(productId: string): Promise<void> {
    const product = await this.productsService.getProductById(productId);
    this.product.next(product as IProduct);
  }

  public async addToFavorites(): Promise<void> {
    await this.productsService.addOrRemoveProductToFavorites(this.product.value as IProduct);
    await this.checkIfProductIsFavorite();
  }

  public async checkIfProductIsFavorite(): Promise<void> {
    this.isFavorite = await this.productsService.checkIfProductIsFavorite(this.product.value as IProduct);
  }

  public async removeFromFavorites(): Promise<void> {
    await this.productsService.addOrRemoveProductToFavorites(this.product.value as IProduct);
    await this.checkIfProductIsFavorite();
  }
}
