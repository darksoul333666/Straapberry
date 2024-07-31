import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../auth/services/auth.service';
import { ROUTES } from 'src/app/shared/constants/routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private readonly authService: AuthService, private router: Router) {}

  public async navigateToInitialPage(): Promise<void> {
    const initialRoute = await this.getInitialRoute();
    this.router.navigate([initialRoute]);
  }

  public async getInitialRoute(): Promise<string> {
    const session = await this.authService.getSession();
    const userLogged = await this.authService.getUserByEmail(session?.email as string);
    if (!userLogged) {
      return ROUTES.LOGIN
    }
    const { isAdmin } = userLogged || {};
    return isAdmin ? ROUTES.LIST_PRODUCTS : ROUTES.HOME;
  }
}
