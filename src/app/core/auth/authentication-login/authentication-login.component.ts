import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentication-login',
  templateUrl: './authentication-login.component.html',
  styleUrls: ['./authentication-login.component.scss'],
})
export class AuthenticationLoginComponent  implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  public loading = false;
  constructor(
    public formBuilder: FormBuilder,
    private readonly authService: AuthService
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
      password: ['']
    })
  }

  /**
   * Login user using email and password, calling login method of AuthService
   * @returns void
   */
  public async onLoginClick(): Promise<void> {
    this.loading = true;
    try {
      const user = await this.authService.login(this.loginForm.value);
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }

  /**
   * Check if passwords match, returning boolean
   * @returns boolean
   */
  public passwordsMatch(): boolean {
    return this.loginForm.get('password')?.value === this.loginForm.get('confirmPassword')?.value
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
