import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientHomeComponent } from './client-home.component';



@NgModule({
  declarations: [ClientHomeComponent],
  imports: [
    CommonModule
  ],
  exports: [ClientHomeComponent]
})
export class ClientHomeModule { }
