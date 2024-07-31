import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { cartOutline } from 'ionicons/icons';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { CATEGORIES, CATEGORY_PRODUCTS_ID } from 'src/app/shared/constants/products.enum';
import { ROUTES } from 'src/app/shared/constants/routes';
import { ICategory, IProduct } from 'src/app/shared/interfaces/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss'],
})
export class ClientHomeComponent implements OnInit {
  username: string | undefined;
  public categories: ICategory[] = CATEGORIES;
  public products = new BehaviorSubject<IProduct[]>([]);
  public totalItemsInCart = new BehaviorSubject<number>(0);
  public routerSubscription: Subscription | undefined;
  public categorySelected: CATEGORY_PRODUCTS_ID | undefined;
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly productsService: ProductService,
    private readonly cartService: CartService
  ) { }

  /**
  * @function ngOnInit
  * @description subscribe to router events, call getItemsCart, getProducts, setUsername, addIcons for ionicons
  * @return {void}
  */
  public ngOnInit(): void {
    this.setUsername();
    this.getItemsCart();
    this.getProducts();
    this.subscribeToRouterEvents();
    addIcons({
      cartOutline
    });
  }

  /**
  * @function subscribeToRouterEvents
  * @description subscribe to router events
  * @return {void}
  */
  public subscribeToRouterEvents(): void {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getItemsCart();
        this.getProducts();
        this.setUsername();
      }
    });
  }

  /**
  * @function getItemsCart
  * @description get items in cart, from cart service, next set totalItemsInCart
  * @return {void}
  */
  public async getItemsCart(): Promise<void> {
    this.totalItemsInCart.next(await this.cartService.getItemsCart());
  }

  /**
  * @function setUsername
  * @description get user by email, from auth service, next call getUserByEmail, and finally set username
  * @return {void}
  */
  public async setUsername(): Promise<void> {
    const session = await this.authService.getSession();
    const user = await this.authService.getUserByEmail(session?.email as string);
    this.username = user?.name;
  }

  /**
  * @function getProducts
  * @description get products from products service, next set products
  * @return {void}
  */
  public async getProducts(): Promise<void> {
    const products = await this.productsService.getProducts();
    this.products.next(products);
  }

  /**
  * @function ngOnDestroy
  * @description unsubscribe from router events
  * @return {void}
  */
  public ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
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
  * @function goToProduct
  * @description navigate to product detail
  * @param {string} id
  * @return {void}
  */
  public goToProduct(id: string): void {
    this.router.navigate([`${ROUTES.DETAIL_PRODUCT}/${id}`]);
  }

  /**
  * @function onFilterClick
  * @description filter products by category
  * @param {CATEGORY_PRODUCTS_ID} id
  * @return {void}
  */
  public async onFilterClick(id: CATEGORY_PRODUCTS_ID): Promise<void> {
    if (this.categorySelected === id) {
      this.categorySelected = undefined;
      this.getProducts();
      return;
    }
    this.categorySelected = id;
    const products = await this.productsService.getProductsByCategory(id);
    this.products.next(products);
  }

  /**
  * @function addToFavorites
  * @description add product to favorites, from products service
  * @param {IProduct} product
  * @return {void}
  */
  public addToFavorites(product: IProduct): void {
    this.productsService.addOrRemoveProductToFavorites(product);
  }
}