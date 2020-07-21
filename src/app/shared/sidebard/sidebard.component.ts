import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebard',
  templateUrl: './sidebard.component.html',
  styles: [
  ]
})
export class SidebardComponent implements OnInit {

  menuItems: any[];

  constructor( private sidebarService: SidebarService) {
    this.menuItems = sidebarService.menu;
    console.log(this.menuItems);
   }

  ngOnInit(): void {
  }

}
