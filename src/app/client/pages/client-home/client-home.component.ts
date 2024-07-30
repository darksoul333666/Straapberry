import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { cartOutline } from 'ionicons/icons';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { CATEGORIES, CATEGORY_PRODUCTS_ID, CATEGORY_PRODUCTS_NAME } from 'src/app/shared/constants/products.enum';
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
  private initialProducts: IProduct[] = [
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
    }
  ];
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly productsService: ProductService,
    private readonly cartService: CartService
  ) { }

  ngOnInit() {
    this.setUsername();
    this.getItemsCart();
    this.getProducts();
    this.subscribeToRouterEvents();
    addIcons({
      cartOutline
    });
  }

  public subscribeToRouterEvents(): void {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) this.getItemsCart();
    });
  }
 
  public async getItemsCart(): Promise<void> {
    this.totalItemsInCart.next(await this.cartService.getItemsCart());
  }

  public async setUsername(): Promise<void> {
    const session = await this.authService.getSession();
    const user = await this.authService.getUserByEmail(session?.email as string);
    this.username = user?.name;
  }

  public async getProducts(): Promise<void> {
    const products = await this.productsService.getProducts();
    this.products.next(products);
  }

  public goToCart(): void {
    this.router.navigate([ROUTES.SHOPPING_CART]);
  }

  public goToProduct(id: string): void {
    this.router.navigate([`${ROUTES.DETAIL_PRODUCT}/${id}`]);
  }
}
