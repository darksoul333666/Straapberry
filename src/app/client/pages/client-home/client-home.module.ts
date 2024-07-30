import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientHomeComponent } from './client-home.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ClientHomeComponent
  }
]
@NgModule({
  declarations: [ClientHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule
  ],
  exports: [ClientHomeComponent]
})
export class ClientHomeModule { }
