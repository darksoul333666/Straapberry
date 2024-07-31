import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileComponent } from './client-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: ClientProfileComponent
  }
]

@NgModule({
  declarations: [ClientProfileComponent],
  imports: [
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ClientProfileComponent]
})
export class ClientProfileModule { }
