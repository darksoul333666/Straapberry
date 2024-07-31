import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { logOut } from 'ionicons/icons';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { delay } from 'src/app/core/functions/functions';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
})
export class ClientProfileComponent {
  public accountForm: FormGroup = new FormGroup({});
  public loading = false;
  constructor(
    private readonly authservice: AuthService,
    private readonly navigationService: NavigationService,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {
    addIcons({
      logOut
    })
   }

   /**
   * @function ngOnInit
   * @description subscribe to router events, call getItemsCart, getProducts, setUsername, addIcons for ionicons
   * @return {void}
   */
   public ngOnInit(): void {
    this.initForm();
   }

  public async ionViewWillEnter(): Promise<void> {
    this.initForm();
    await this.getAccountInfo();
  }

  /**
   * Initialize register form, with email and password
   * @returns void
   */
  public initForm(): void {
    this.accountForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      name: [null, [Validators.required]]
    })
  }

  /**
   * @function getAccountInfo, get user info by email and set it in form
   * @returns void
   */
  public async getAccountInfo() {
    const session = await this.authService.getSession();
    const userLogged = await this.authService.getUserByEmail(session?.email as string);
    if (userLogged) {
      this.accountForm.patchValue(userLogged);
      this.accountForm.get('email')?.disable();
      this.accountForm.get('password')?.setValue(this.accountForm.get('confirmPassword')?.value);
    }
  }

  /**
   * Function called when register button is clicked
   * @returns void
   * @throws Error if email already exists
   * @function delay - to show loading animation for 2 almost seconds and navigate to initial page
   */
  public async onUpdateClick(): Promise<void> {
    this.loading = true;
    try {
       await this.authService.updateUser(this.accountForm.getRawValue());
       await delay(2000);
       this.loading = false;
       await delay(1000);
    } catch (error) {
      this.handleUpdateError(error);
    }
  }

  /**
   * Handle register error and set loading to false, set error message for show it in UI
   * @param error unknown
   */
  public handleUpdateError(error: unknown) {
    if(error instanceof Error) {
      this.loading = false;
    }
  }
  /**
   * Function to check if passwords match
   * @returns boolean
   */
  public passwordsMatch(): boolean {
    return this.accountForm.get('password')?.value === this.accountForm.get('confirmPassword')?.value
  }

  /**
   * Function to logout
   * @returns void
   * @description navigate to initial page using navigation service
   */
  public async logout(): Promise<void> {
    await this.authservice.logout();
    this.navigationService.navigateToInitialPage();
  }

}
