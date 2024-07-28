import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, createOutline, trashOutline } from 'ionicons/icons';
import { CATEGORY_PRODUCTS_ID, CATEGORY_PRODUCTS_NAME } from 'src/app/shared/constants/products.enum';
import { ROUTES } from 'src/app/shared/constants/routes';
import { IProduct } from 'src/app/shared/interfaces/products';

@Component({
  selector: 'app-admin-list-products',
  templateUrl: './admin-list-products.component.html',
  styleUrls: ['./admin-list-products.component.scss'],
})
export class AdminListProductsComponent  implements OnInit {
   mockProducts: IProduct[] = [
    {
      id: 1,
      name: 'Smartphone XYZ',
      price: 299.99,
      description: 'Un smartphone de última generación con cámara de 64MP.',
      category: {
        name: CATEGORY_PRODUCTS_NAME.PHONES,
        id: CATEGORY_PRODUCTS_ID.PHONES
      },
      image: 'https://example.com/images/smartphone_xyz.jpg'
    },
    {
      id: 2,
      name: 'Laptop ABC',
      price: 899.99,
      description: 'Laptop potente con procesador i7 y 16GB de RAM.',
      category: {
        name: CATEGORY_PRODUCTS_NAME.COMPUTATORS,
        id: CATEGORY_PRODUCTS_ID.COMPUTATORS
      },
      image: 'https://example.com/images/laptop_abc.jpg'
    },
    {
      id: 3,
      name: 'Camiseta Casual',
      price: 19.99,
      description: 'Camiseta de algodón 100% con estampado moderno.',
      category: {
        name: CATEGORY_PRODUCTS_NAME.CLOTHES,
        id: CATEGORY_PRODUCTS_ID.CLOTHES
      },
      image: 'https://example.com/images/camiseta_casual.jpg'
    },
    {
      id: 4,
      name: 'Aspiradora Turbo',
      price: 129.99,
      description: 'Aspiradora potente con filtro HEPA para una limpieza profunda.',
      category: {
        name: CATEGORY_PRODUCTS_NAME.CLEANING,
        id: CATEGORY_PRODUCTS_ID.CLEANING
      },
      image: 'https://example.com/images/aspiradora_turbo.jpg'
    },
    {
      id: 5,
      name: 'Auriculares Bluetooth',
      price: 79.99,
      description: 'Auriculares inalámbricos con cancelación de ruido.',
      category: {
        name: CATEGORY_PRODUCTS_NAME.ACCESSORIES,
        id: CATEGORY_PRODUCTS_ID.ACCESSORIES
      },
      image: 'https://example.com/images/auriculares_bluetooth.jpg'
    },
    {
      id: 6,
      name: 'Tableta Pro',
      price: 349.99,
      description: 'Tableta con pantalla de 10.5 pulgadas y lápiz óptico incluido.',
      category: {
        name: CATEGORY_PRODUCTS_NAME.TABLETS,
        id: CATEGORY_PRODUCTS_ID.TABLETS
      },
      image: 'https://example.com/images/tableta_pro.jpg'
    }
  ];
  
  constructor(
    private router: Router,
  ) { 
    addIcons({ add, trashOutline, createOutline });
  }

  ngOnInit() {}

  public onUpdateClick(productId: number): void {
    this.router.navigate([`${ROUTES.CREATE_OR_UPDATE_PRODUCT}/${productId}`]);
  }

}
