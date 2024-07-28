import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ErrorsMessage } from '../constants/auth.enum';
import { NavigationService } from '../../services/navigation.service';
import { delay } from '../../functions/functions';

@Component({
  selector: 'app-authentication-register',
  templateUrl: './authentication-register.component.html',
  styleUrls: ['./authentication-register.component.scss'],
})
export class AuthenticationRegisterComponent  implements OnInit{
  registerForm: FormGroup = new FormGroup({});
  public loading = false;
  public errorRegister: string | null = null;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly navigationService: NavigationService
  ) { }

  public ngOnInit() {
    this.initForm();
  }

  /**
   * Initialize register form, with email and password
   * @returns void
   */
  public initForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      name: [null, [Validators.required]]
    })
  }

  /**
   * Function called when register button is clicked
   * @returns void
   * @throws Error if email already exists
   * @function delay - to show loading animation for 2 almost seconds and navigate to initial page
   */
  public async onRegisterClick(): Promise<void> {
    this.loading = true;
    try {
       await this.authService.addUser(this.registerForm.value);
       await delay(2000);
       this.loading = false;
       await delay(1000);
       this.navigationService.navigateToInitialPage();
    } catch (error) {
      this.handleRegisterError(error);
    }
  }

  /**
   * Handle register error and set loading to false, set error message for show it in UI
   * @param error unknown
   */
  public handleRegisterError(error: unknown) {
    if(error instanceof Error) {
      console.log(error.message);
      this.errorRegister = ErrorsMessage[error.message as keyof typeof ErrorsMessage];
      this.loading = false;
    }
  }
  /**
   * Function to check if passwords match
   * @returns boolean
   */
  public passwordsMatch(): boolean {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value
  }

  /**
   * LifeCycle hook, ionViewWillLeave, reset register form, set loading to false
   * @returns void
   */
  public ionViewWillLeave(): void {
    this.loading = false;
    this.registerForm.reset();
  }

}
