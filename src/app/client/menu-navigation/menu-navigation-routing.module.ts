import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuNavigationComponent } from './menu-navigation.component';


const routes: Routes = [
    {
      path: 'menu',
      component: MenuNavigationComponent,
      children: [
        {
          path: 'home',
          loadChildren: () => import('../../client/pages/client-home/client-home.module').then(m => m.ClientHomeModule)
        },
        {
          path: 'favorites',
          loadChildren: () => import('../../client/pages/client-favorites/client-favorites.module').then(m => m.ClientFavoritesModule)
        },
        {
          path: 'profile',
          loadChildren: () => import('../../client/pages/client-profile/client-profile.module').then(m => m.ClientProfileModule)
        },
        {
          path: '',
          redirectTo: '/client/menu/home',
          pathMatch: 'full'
        }
      ]
    }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class MenuNavigationRoutingModule { }
