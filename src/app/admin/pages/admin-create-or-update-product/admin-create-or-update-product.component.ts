import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CATEGORY_PRODUCTS } from 'src/app/shared/constants/products.enum';

@Component({
  selector: 'app-admin-create-or-update-product',
  templateUrl: './admin-create-or-update-product.component.html',
  styleUrls: ['./admin-create-or-update-product.component.scss'],
})
export class AdminCreateOrUpdateProductComponent  implements OnInit {
  titlePage: string = 'Agregar producto';
  public idProduct: number | undefined;
  public isEditScreen: boolean = false;
  registerProductForm: FormGroup = new FormGroup({});
  public categories: string[] = Object.values(CATEGORY_PRODUCTS);
  constructor(
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) { }

  public ngOnInit() {
   this.setModeScreenAndTitle();
   this.initForm();
  }

  public initForm(): void {
    this.registerProductForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      image: [null, ],
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
    this.titlePage = 'Editar producto';
  }

  /**
   * @returns void
   * @function getIdFromRoute - get id from route 
   * @description get id from route and convert it to number
   */
  public getIdFromRoute(): number | undefined {
    return parseInt(this.route.snapshot.paramMap.get('id') as string) || undefined
  }

}
