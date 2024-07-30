import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-client-detail-product',
  templateUrl: './client-detail-product.component.html',
  styleUrls: ['./client-detail-product.component.scss'],
})
export class ClientDetailProductComponent implements OnInit {
  productId: string = '';
  product = new BehaviorSubject<IProduct | undefined>(undefined);
  constructor(
    private readonly productsService: ProductService,
    private readonly cartService: CartService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getIdProduct(this.productId);
    this.getProduct(this.productId);
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

}
