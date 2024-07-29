import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuNavigationComponent } from './menu-navigation.component';
import { IonicModule } from '@ionic/angular';
import { MenuNavigationRoutingModule } from './menu-navigation-routing.module';

@NgModule({
  declarations: [MenuNavigationComponent],
  imports: [
    CommonModule,
    MenuNavigationRoutingModule,
    IonicModule
  ],
  exports: [MenuNavigationComponent]
})
export class MenuNavigationModule { }
