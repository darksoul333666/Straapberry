import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListProductsComponent } from './components/admin-list-products/admin-list-products.component';
import { AdminCreateOrUpdateProductComponent } from './components/admin-create-or-update-product/admin-create-or-update-product.component';

const routes: Routes = [
  {
    path: 'list-products',
    component: AdminListProductsComponent
  },
  {
    path: 'create-or-update-product',
    component: AdminCreateOrUpdateProductComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
