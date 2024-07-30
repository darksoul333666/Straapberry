import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileComponent } from './client-profile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ClientProfileComponent
  }
]

@NgModule({
  declarations: [ClientProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ClientProfileComponent]
})
export class ClientProfileModule { }
