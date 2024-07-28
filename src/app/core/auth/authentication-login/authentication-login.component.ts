import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ErrorsMessage } from '../constants/auth.enum';
import { NavigationService } from '../../services/navigation.service';
import { delay } from '../../functions/functions';

@Component({
  selector: 'app-authentication-login',
  templateUrl: './authentication-login.component.html',
  styleUrls: ['./authentication-login.component.scss'],
})
export class AuthenticationLoginComponent  implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  public loading = false;
  public errorLogin: string | null = null;
  constructor(
    public formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly navigationService: NavigationService
  ) { }

  public ngOnInit() {
    this.initForm();
  }

  /**
   * Initialize login form, with email and password
   * @returns void
   */
  public initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  /**
   * Login user using email and password, calling login method of AuthService
   * @returns void
   * @function delay - to show loading animation for 2 almost seconds and navigate to initial page
   */
  public async onLoginClick(): Promise<void> {
    this.loading = true;
    try {
      await this.authService.login(this.loginForm.value);
      await delay(2000);
      this.loading = false;
      await delay(1000);
      this.navigationService.navigateToInitialPage();
    } catch (error: unknown) {
      this.handleLoginError(error);
    }
  }

  /**
   * Handle login error and set loading to false, set error message for show it in UI
   * @param error unknown
   */
  public handleLoginError(error: unknown) {
    if(error instanceof Error) {
      console.log(error.message);
      this.errorLogin = ErrorsMessage[error.message as keyof typeof ErrorsMessage];
      this.loading = false;
    }
  }

  /**
   * LifeCycle hook, ionViewWillLeave, reset login form, set loading to false
   * @returns void
   */
  public ionViewWillLeave(): void {
    this.loading = false;
    this.loginForm.reset();
  }
}
