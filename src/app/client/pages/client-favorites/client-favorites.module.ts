import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientFavoritesComponent } from './client-favorites.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ClientFavoritesComponent
  }
]

@NgModule({
  declarations: [ClientFavoritesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ClientFavoritesComponent]
})
export class ClientFavoritesModule { }
