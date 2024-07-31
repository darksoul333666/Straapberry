import { Component } from '@angular/core';
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

  /**
  *ionViewWillEnter(): Promise<void>
  * ionViewWillEnter is lifecycle hook, call getProduct whenever the view is entered
  */
  async ionViewWillEnter() {
    this.getIdProduct();
    await this.getProduct(this.productId);
    await this.checkIfProductIsFavorite();
  }

  /**
  * @function getIdProduct
  * @description get id from url, 
  * @return {void}
  */
  public async getIdProduct(): Promise<void> {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
  }

  /**
  * @function addOneToProductFromCart
  * @description add one to product from cart
  * @return {void}
  */
  public addOneToProductFromCart(): void {
    this.cartService.addProductToCart(this.product.value as IProduct);
  }

  /**
  * @function getProduct
  * @description get product by id and set it to product
  * @return {void}
  */
  public async getProduct(productId: string): Promise<void> {
    const product = await this.productsService.getProductById(productId);
    this.product.next(product as IProduct);
  }

  /**
  * @function addToFavorites
  * @description add product to favorites, from products service, next call checkIfProductIsFavorite
  * @return {void}
  */
  public async addToFavorites(): Promise<void> {
    await this.productsService.addOrRemoveProductToFavorites(this.product.value as IProduct);
    await this.checkIfProductIsFavorite();
  }

  /**
  * @function checkIfProductIsFavorite
  * @description check if product is favorite, from products service, next set isFavorite
  * @return {void}
  */
  public async checkIfProductIsFavorite(): Promise<void> {
    this.isFavorite = await this.productsService.checkIfProductIsFavorite(this.product.value as IProduct);
  }

  /**
  * @function removeFromFavorites
  * @description remove product from favorites, from products service, next call checkIfProductIsFavorite
  * @return {void}
  */
  public async removeFromFavorites(): Promise<void> {
    await this.productsService.addOrRemoveProductToFavorites(this.product.value as IProduct);
    await this.checkIfProductIsFavorite();
  }
}
