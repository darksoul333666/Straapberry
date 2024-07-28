import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-create-or-update-product',
  templateUrl: './admin-create-or-update-product.component.html',
  styleUrls: ['./admin-create-or-update-product.component.scss'],
})
export class AdminCreateOrUpdateProductComponent  implements OnInit {
  titlePage: string = 'Agregar producto';
  public idProduct: number | undefined;
  public isEditScreen: boolean = false;
  constructor(
    private readonly route: ActivatedRoute,
  ) { }

  public ngOnInit() {
   this.setModeScreenAndTitle();
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
