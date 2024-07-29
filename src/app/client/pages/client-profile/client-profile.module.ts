import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileComponent } from './client-profile.component';



@NgModule({
  declarations: [ClientProfileComponent],
  imports: [
    CommonModule
  ],
  exports: [ClientProfileComponent]
})
export class ClientProfileModule { }
