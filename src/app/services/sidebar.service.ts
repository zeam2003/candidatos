import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [

    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Principal', url: '/'},
        { titulo: 'Progreso', url: 'progress'},
        { titulo: 'Promesas', url: 'promesas'},
        { titulo: 'Graficas', url: 'graficas'},
        { titulo: 'Rxjs', url: 'rxjs'},
      ]
    }

  ];

  constructor() { }
}
