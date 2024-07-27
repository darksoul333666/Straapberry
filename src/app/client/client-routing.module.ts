import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHomeComponent } from './pages/client-home/client-home.component';
import { ClientDetailProductComponent } from './pages/client-detail-product/client-detail-product.component';
import { ClientShoppintCartComponent } from './pages/client-shoppint-cart/client-shoppint-cart.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/client/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: ClientHomeComponent
    },
    {
        path: 'detail-product',
        component: ClientDetailProductComponent,
    },
    {
        path: 'shopping-cart',
        component: ClientShoppintCartComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
