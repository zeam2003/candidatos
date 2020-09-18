import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Candidato } from '../../../models/candidato.model';

import { CandidatoService } from '../../../services/candidato.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';



@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styles: [
  ]
})
export class CandidatosComponent implements OnInit, OnDestroy {

  public cargando = true;
  public candidatos: Candidato[] = [];
  public candidatosTemp: Candidato[] = [];
  private imgSubs: Subscription;

  constructor( private candidatoServcie: CandidatoService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarCandidatos();

    this.imgSubs = this.modalImagenService.nuevaImagen
   .pipe(
     delay(200)
   )
   .subscribe( img => {
     this.cargarCandidatos();
   } );
  }

  // Cargar Candidatos
  cargarCandidatos() {
   //  this.candidatoServcie
   this.cargando = true;
   this.candidatoServcie.cargarCandidatos()
     .subscribe( candidatos => {
       this.cargando = false;
       this.candidatosTemp = candidatos;
       this.candidatos = candidatos;
       console.log(candidatos);
     });
  }

  // abre modal para cargar o modificar imagenes
  abrirModal( candidato: Candidato ) {

    this.modalImagenService.abrirModal( 'candidatos', candidato._id, candidato.img );
  }

  // caja de búsqueda
  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.candidatos = this.candidatosTemp;
    }

    this.busquedasService.buscar('candidatos', termino )
      .subscribe( resultados => {
        this.candidatos = resultados;
      } );
  }

  // Borrar candidato
  borrarCandidato( candidato: Candidato ) {

    Swal.fire({
      title: '¿Borrar este Candidato?',
      text: `Esta a punto de borrar a ${ candidato.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
      }).then((result) => {
        if (result.value) {
          this.candidatoServcie.borrarCandidato(candidato._id)
            .subscribe( resp => {
              this.cargarCandidatos();
              Swal.fire('Candidato borrado', `${ candidato.nombre } fue eliminado correctamenete`, 'success');
            });
        }
      });
  }

}
