import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, createOutline, trashOutline } from 'ionicons/icons';
import { BehaviorSubject } from 'rxjs';
import { ROUTES } from 'src/app/shared/constants/routes';
import { IProduct } from 'src/app/shared/interfaces/products';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-list-products',
  templateUrl: './admin-list-products.component.html',
  styleUrls: ['./admin-list-products.component.scss'],
})
export class AdminListProductsComponent {
  products = new BehaviorSubject<IProduct[]>([]);
  public isOpenAlert: boolean = false;
  public idProductForDelete: string | undefined;
  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => { this.isOpenAlert = false },
    },
    {
      text: 'Eliminar',
      role: 'confirm',
      handler: () => this.onConfirmDelete(),
    },
  ]
  constructor(
    private router: Router,
    private readonly productsService: ProductService
  ) { 
    addIcons({ add, trashOutline, createOutline });
  }

  /**
   * @function ionViewWillEnter - ionViewWillEnter
   * @description ionViewWillEnter, lifecycle hook, call getAllProducts whenever the view is entered
   */
  public ionViewWillEnter(): void {
    this.getAllProducts();
  }

  /**
   * @returns void
   * @function onUpdateClick - navigate to update product screen
   * @description navigate to update product screen, using product id, passed as param
   */
  public onUpdateClick(productId: string): void {
    this.router.navigate(['/admin/menu']);
  }

  /**
   * @returns void
   * @function getAllProducts - get all products
   * @description get all products and set them in products BehaviorSubject
   */
  public async getAllProducts(): Promise<void> {
    try {
      this.products.next(await this.productsService.getProducts());
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @returns void
   * @function onDeleteClick - function launched when user clicks on delete button
   * @description open alert and set idProductForDelete
   */
  public async onDeleteClick(productId: string): Promise<void> {
    this.isOpenAlert = true;
    this.idProductForDelete = productId;
  }

  /**
   * @returns promise<void>
   * @function onDeleteClick - delete product
   * @description delete product using product id and call service
   */
  public async onConfirmDelete(): Promise<void> {
    if(!this.idProductForDelete) return;
    try {
      await this.productsService.deleteProduct(this.idProductForDelete);
      this.idProductForDelete = undefined;
      this.getAllProducts();
    } catch (error) {
      console.log(error);
    }
  }
}
