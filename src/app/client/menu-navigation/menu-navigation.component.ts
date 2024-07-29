import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { heart, homeOutline, person } from 'ionicons/icons';
@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrls: ['./menu-navigation.component.scss'],
})
export class MenuNavigationComponent  implements OnInit {

  constructor() { 
    addIcons({
      heart,
      homeOutline,
      person
    })
  }

  ngOnInit() {}

}
