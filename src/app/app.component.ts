import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './core/auth/services/auth.service';
import { ProductService } from './shared/services/product.service';
import { CartService } from './shared/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly productsService: ProductService,
    private readonly cartService: CartService
  ) {}

  public async initStorage(): Promise<void> {
    await this.authService.init();
    await this.productsService.init();
    await this.cartService.init();
  }
}
