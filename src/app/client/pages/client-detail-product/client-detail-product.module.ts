import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailProductComponent } from './client-detail-product.component';
import { IonicModule } from '@ionic/angular';
const routes: Routes = [
  {
    path: '',
    component: ClientDetailProductComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientDetailProductModule { }
