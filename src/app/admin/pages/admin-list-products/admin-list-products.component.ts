import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, createOutline, trashOutline } from 'ionicons/icons';
import { CATEGORY_PRODUCTS } from 'src/app/shared/constants/products.enum';
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
      name: 'Laptop HP Pavilion',
      price: 750.00,
      description: 'Laptop HP Pavilion 15 con procesador Intel Core i5, 8GB RAM, 256GB SSD.',
      category: CATEGORY_PRODUCTS.COMPUTATORS,
      image: 'https://s3-eu-west-1.amazonaws.com/media.macnificos.com/Apple_landings/Mac_does_that/mac.png'
    },
    {
      id: 2,
      name: 'iPad Pro',
      price: 999.99,
      description: 'iPad Pro de 12.9 pulgadas, 256GB, Wi-Fi, Chip M1.',
      category: CATEGORY_PRODUCTS.TABLETS,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-UkBX4KMDEiEPOXLKmNKmXVKFQEoJmYMQRQ&s'
    },
    {
      id: 3,
      name: 'Teclado Mecánico Razer',
      price: 120.00,
      description: 'Teclado mecánico Razer BlackWidow con iluminación RGB.',
      category: CATEGORY_PRODUCTS.ACCESSORIES,
      image: 'https://s3-eu-west-1.amazonaws.com/media.macnificos.com/Apple_landings/Mac_does_that/mac.png'
    },
    {
      id: 4,
      name: 'iPhone 13',
      price: 799.00,
      description: 'iPhone 13 con 128GB de almacenamiento, pantalla Super Retina XDR de 6.1 pulgadas.',
      category: CATEGORY_PRODUCTS.PHONES,
      image: 'https://s3-eu-west-1.amazonaws.com/media.macnificos.com/Apple_landings/Mac_does_that/mac.png'
    },
    {
      id: 5,
      name: 'Mouse Inalámbrico Logitech',
      price: 50.00,
      description: 'Mouse inalámbrico Logitech MX Master 3 con tecnología avanzada.',
      category: CATEGORY_PRODUCTS.ACCESSORIES,
      image: 'https://s3-eu-west-1.amazonaws.com/media.macnificos.com/Apple_landings/Mac_does_that/mac.png'
    },
    {
      id: 6,
      name: 'Tablet Samsung Galaxy Tab S7',
      price: 650.00,
      description: 'Samsung Galaxy Tab S7 de 11 pulgadas, 128GB, Wi-Fi, Snapdragon 865+.',
      category: CATEGORY_PRODUCTS.TABLETS,
      image: 'https://s3-eu-west-1.amazonaws.com/media.macnificos.com/Apple_landings/Mac_does_that/mac.png'
    },
    {
      id: 7,
      name: 'Monitor Dell Ultrasharp',
      price: 300.00,
      description: 'Monitor Dell Ultrasharp de 24 pulgadas con resolución Full HD.',
      category: CATEGORY_PRODUCTS.COMPUTATORS,
      image: 'https://s3-eu-west-1.amazonaws.com/media.macnificos.com/Apple_landings/Mac_does_that/mac.png'
    },
    {
      id: 8,
      name: 'Cargador Inalámbrico Anker',
      price: 30.00,
      description: 'Cargador inalámbrico Anker PowerWave compatible con iPhone y Android.',
      category: CATEGORY_PRODUCTS.ACCESSORIES,
      image: 'https://s3-eu-west-1.amazonaws.com/media.macnificos.com/Apple_landings/Mac_does_that/mac.png'
    },
    {
      id: 9,
      name: 'Samsung Galaxy S21',
      price: 850.00,
      description: 'Samsung Galaxy S21 con 128GB de almacenamiento, pantalla Dynamic AMOLED 2X.',
      category: CATEGORY_PRODUCTS.PHONES,
      image: 'https://s3-eu-west-1.amazonaws.com/media.macnificos.com/Apple_landings/Mac_does_that/mac.png'
    },
    {
      id: 10,
      name: 'Laptop Apple MacBook Pro',
      price: 1299.99,
      description: 'Apple MacBook Pro de 13 pulgadas con chip M1, 8GB RAM, 256GB SSD.',
      category: CATEGORY_PRODUCTS.COMPUTATORS,
      image: 'https://s3-eu-west-1.amazonaws.com/media.macnificos.com/Apple_landings/Mac_does_that/mac.png'
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
