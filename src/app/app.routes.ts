import { Routes } from '@angular/router';
import { ROUTES } from './shared/constants/routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo:  ROUTES.LOGIN,
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then((m) => m.ClientModule),
  }
];
