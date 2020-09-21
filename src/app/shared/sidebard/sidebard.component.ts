import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebard',
  templateUrl: './sidebard.component.html',
  styles: [
  ]
})
export class SidebardComponent implements OnInit {

  menuItems: any[];
  public usuario: Usuario;

  constructor( public sidebarService: SidebarService,
               private usuarioService: UsuarioService) {
    // this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
  }

}
