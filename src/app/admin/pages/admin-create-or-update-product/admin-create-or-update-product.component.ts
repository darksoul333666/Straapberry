import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'src/app/core/functions/functions';
import { CATEGORIES, ERRORS_MESSAGE, SUCCESS_MESSAGE } from 'src/app/shared/constants/products.enum';
import { ROUTES } from 'src/app/shared/constants/routes';
import { ICategory } from 'src/app/shared/interfaces/products';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-create-or-update-product',
  templateUrl: './admin-create-or-update-product.component.html',
  styleUrls: ['./admin-create-or-update-product.component.scss'],
})
export class AdminCreateOrUpdateProductComponent  implements OnInit {
  titlePage: string = TITLE_PAGE.CREATE;
  public idProduct: string | undefined;
  public isEditScreen: boolean = false;
  registerProductForm: FormGroup = new FormGroup({});
  public categories: ICategory[] = CATEGORIES;
  public isToastOpen: boolean = false;
  public messageToast: string = '';
  public isLoading: boolean = false;
  public colorToast: string = COLORS_TOAST.SUCCESS;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly productsService: ProductService,
    private readonly router: Router
  ) { }

  public ngOnInit() {
   this.setModeScreenAndTitle();
   this.initForm();
  }

  public initForm(): void {
    this.registerProductForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      image: ['https://ocelot.com.mx/wp-content/uploads/2023/04/teclado-mecanico-switch-rojo-1024x677.jpg', ],
      description: [null, [Validators.required]],
      category: [null, [Validators.required]]
    })
  }

  /**
   * @returns void
   * @function setModeScreenAndTitle - set mode screen and title
   * @description set mode screen and title using id retrived from route
   */
  public setModeScreenAndTitle(): void {
    this.idProduct = this.getIdFromRoute();
    if(!this.idProduct) return;
    this.isEditScreen = true;
    this.titlePage = TITLE_PAGE.UPDATE;
    this.setInitialValues();
  }

  /**
   * @returns void
   * @function setInitialValues - set initial values
   * @description set initial values using id retrived from route, and fetch product from service
   */
  public async setInitialValues(): Promise<void> {
    const product = await this.productsService.getProductById(this.idProduct as string);
    if(!product) throw new Error(ERRORS_MESSAGE.PRODUCT_NOT_FOUND);
    this.registerProductForm.patchValue(product);
  }

  /**
   * @returns void
   * @function getIdFromRoute - get id from route 
   * @description get id from route and convert it to number
   */
  public getIdFromRoute(): string | undefined {
    return this.route.snapshot.paramMap.get('id') || undefined
  }

  /**
   * @returns void
   * @function handlePressButton - handle press button, create or update product depending on mode
   * @description handle press button
   */
  public handlePressButton(): void {
    this.isEditScreen ? this.updateProduct() : this.createProduct();
  }

  /**
   * @returns Promise<void>
   * @function createProduct - create product, call service
   * @description create product using form and call service, use delay for simulate loading and show spinner
   */
  public async createProduct(): Promise<void> {
    this.isLoading = true;
    try {
      await this.productsService.createProduct(this.registerProductForm.value);
      await delay(3000);
      this.handleSuccessCreateProduct();
    } catch (error) {
      console.log(error);
      this.handleErrorCreateProduct();
    }
  }

  /**
   * @returns Promise<void>
   * @function handleSuccessCreateProduct - handle success create product
   * @description handle success create product, navigate to list products and show toast, use delay for show toast min 3 seconds
   */
  public async handleSuccessCreateProduct(): Promise<void> {
    this.isToastOpen = true;
    this.messageToast = SUCCESS_MESSAGE.SUCCESS_CREATE_PRODUCT;
    this.colorToast = COLORS_TOAST.SUCCESS;
    await delay(3000);
    this.router.navigate([ROUTES.LIST_PRODUCTS]);
  }

  /**
   * @returns void
   * @function handleErrorCreateProduct - handle error create product
   * @description handle error create product, show toast, set loading to false, change color toast to danger
   */
  public handleErrorCreateProduct(): void {
    this.isLoading = false;
    this.isToastOpen = true;
    this.messageToast = ERRORS_MESSAGE.ERROR_CREATE_PRODUCT;
    this.colorToast = COLORS_TOAST.DANGER;
  }

  /**
   * @returns Promise<void>
   * @function updateProduct - update product, call service
   * @description update product using form and call service, use delay for simulate loading and show spinner
   */
  public async updateProduct(): Promise<void> {
    this.isLoading = true;
    try {
      await this.productsService.editProduct({...this.registerProductForm.value, id: this.idProduct});
      await delay(3000);
      this.handleSuccessUpdateProduct();
    } catch (error) {
      console.log(error);
      this.handleErrorUpdateProduct();
    }
  }

  /**
   * @returns void
   * @function handleSuccessUpdateProduct - handle success update product
   * @description handle success update product, navigate to list products and show toast, use delay for show toast min 3 seconds
   */
  public async handleSuccessUpdateProduct(): Promise<void> {
    this.isToastOpen = true;
    this.messageToast = SUCCESS_MESSAGE.SUCCESS_UPDATE_PRODUCT;
    this.colorToast = COLORS_TOAST.SUCCESS;
    await delay(3000);
    this.router.navigate([ROUTES.LIST_PRODUCTS]);
  }

  /**
   * @returns void
   * @function handleErrorUpdateProduct - handle error update product
   * @description handle error update product, show toast, set loading to false, change color toast to danger
   */
  public handleErrorUpdateProduct(): void {
    this.isLoading = false;
    this.isToastOpen = true;
    this.messageToast = ERRORS_MESSAGE.ERROR_UPDATE_PRODUCT;
    this.colorToast = COLORS_TOAST.DANGER;
  }

  /**
   * @returns void
   * @function ionViewWillLeave - ion view will leave
   * @description ion view will leave, lifeCycle hook, reset form and set isToastOpen to false
   */
  public ionViewWillLeave(): void {
    this.isToastOpen = false;
    this.registerProductForm.reset();
  }

}

enum COLORS_TOAST {
  SUCCESS = 'success',
  DANGER = 'danger'
}

enum TITLE_PAGE {
  CREATE = 'Agregar producto',
  UPDATE = 'Editar Producto'
}
