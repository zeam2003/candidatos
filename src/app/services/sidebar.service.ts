import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  public menu = [];

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];

  }
  /* menu: any[] = [

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
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios'},
        { titulo: 'Candidatos', url: 'candidatos'},
        { titulo: 'Busquedas', url: 'busquedas'},
        { titulo: 'Clientes', url: 'clientes'}
      ]
    }

  ]; */

}
