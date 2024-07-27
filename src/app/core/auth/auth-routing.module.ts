import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLoginComponent } from './authentication-login/authentication-login.component';
import { AuthenticationRegisterComponent } from './authentication-register/authentication-register.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        redirectTo: 'auth/login',
        component: AuthenticationLoginComponent
    },
    {
        path: 'auth/register',
        component: AuthenticationRegisterComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
