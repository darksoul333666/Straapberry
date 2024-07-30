import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuNavigationModule } from './menu-navigation/menu-navigation.module';
import { ClientShoppintCartComponent } from './pages/client-shoppint-cart/client-shoppint-cart.component';
import { IonicModule } from '@ionic/angular';
import { ClientDetailProductComponent } from './pages/client-detail-product/client-detail-product.component';
@NgModule({
  declarations: [ClientShoppintCartComponent, ClientShoppintCartComponent, ClientDetailProductComponent],
  imports: [
    IonicModule,
    CommonModule,
    MenuNavigationModule,
  ]
})
export class ClientModule { }
