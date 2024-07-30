import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminListProductsComponent } from './pages/admin-list-products/admin-list-products.component';
import { AdminCreateOrUpdateProductComponent } from './pages/admin-create-or-update-product/admin-create-or-update-product.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AdminListProductsComponent, AdminCreateOrUpdateProductComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
