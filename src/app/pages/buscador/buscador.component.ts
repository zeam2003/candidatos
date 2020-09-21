import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BusquedasService } from '../../services/busquedas.service';

import { Usuario } from '../../models/usuario.model';
import { Candidato } from '../../models/candidato.model';
import { Busqueda } from '../../models/busqueda.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public candidatos: Candidato[] = [];
  public busquedas: Busqueda[] = [];

  constructor( private activatedRouter: ActivatedRoute,
               private busquedaService: BusquedasService,
               private router: Router) { }

  ngOnInit(): void {

    this.activatedRouter.params
      .subscribe( ({termino}) => {
        this.busquedaGlobal(  ( termino ));
        console.log('tick');
      });
  }

  busquedaGlobal( termino: string) {

    console.log(termino);
    
    if (termino.trim().length === 0 ){
      console.log('paso poraca');

      Swal.fire('Aviso!', 'Debe ingresar un término a buscar', 'warning');
      // termino = '';
      // return;
      
    }

    this.busquedaService.busquedaGlobal( termino.trim() )
      .subscribe( (resp: any ) => {
        console.log(resp);
        this.usuarios   = resp.usuarios;
        this.candidatos = resp.candidatos;
        this.busquedas  = resp.busquedas;
      });
  }

  abrirCandidato( candidato: Candidato ) {
    console.log(candidato);
    this.router.navigateByUrl(`/dashboard/candidato/${ candidato._id }`);
  }

}
