import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentication-register',
  templateUrl: './authentication-register.component.html',
  styleUrls: ['./authentication-register.component.scss'],
})
export class AuthenticationRegisterComponent  implements OnInit{
  registerForm: FormGroup = new FormGroup({});
  public loading = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
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
   */
  public async onRegisterClick(): Promise<void> {
    try {
      this.authService.addUser(this.registerForm.value)
    } catch (error) {
      console.log(error);
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
