import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientFavoritesComponent } from './client-favorites.component';



@NgModule({
  declarations: [ClientFavoritesComponent],
  imports: [
    CommonModule
  ],
  exports: [ClientFavoritesComponent]
})
export class ClientFavoritesModule { }
