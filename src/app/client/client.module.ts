import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuNavigationModule } from './menu-navigation/menu-navigation.module';
import { ClientShoppintCartComponent } from './pages/client-shoppint-cart/client-shoppint-cart.component';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [ClientShoppintCartComponent, ClientShoppintCartComponent],
  imports: [
    IonicModule,
    CommonModule,
    MenuNavigationModule,
  ]
})
export class ClientModule { }
