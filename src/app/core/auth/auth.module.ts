import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './auth-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { AuthenticationLoginComponent } from './authentication-login/authentication-login.component';
import { AuthenticationRegisterComponent } from './authentication-register/authentication-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ AuthenticationLoginComponent, AuthenticationRegisterComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    IonicModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    })
  ]
})
export class AuthModule { }
