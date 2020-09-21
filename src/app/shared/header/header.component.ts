import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor( private usuarioService: UsuarioService,
               private router: Router) {

    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  logout() {
    this.usuarioService.logout();
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      // this.router.navigateByUrl(`/dashboard`);
      return;
    }

    if (termino.trim().length === 0 ){
      console.log('paso poraca');

      Swal.fire('Aviso!', 'Debe ingresar un término a buscar', 'warning');
      termino.trim();
      return;
    }


    this.router.navigateByUrl(`/dashboard/buscador/${termino}`);
  }

}
