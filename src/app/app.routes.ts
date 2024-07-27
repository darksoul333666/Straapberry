import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/components/navigation-tabs/tabs/tabs.routes').then((m) => m.routes),
  },
];
