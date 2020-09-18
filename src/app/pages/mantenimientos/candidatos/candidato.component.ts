import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BusquedaService } from '../../../services/busqueda.service';
import { CandidatoService } from '../../../services/candidato.service';

import { Busqueda } from '../../../models/busqueda.model';
import { Candidato } from '../../../models/candidato.model';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';



@Component({
  selector: 'app-candidato',
  templateUrl: './candidato.component.html',
  styles: [
  ]
})
export class CandidatoComponent implements OnInit {

  public avance: number = 0;

  public candidatoForm: FormGroup;
  public busquedas: Busqueda[] = [];

  public candidatoSeleccionado: Candidato;
  public busquedaSeleccionada: Busqueda; // La busca seleccionada al cargar

  public estadoTitulo: boolean = true;

   progreso1: number = 0;
   progreso2: number = 50;


  constructor( private fb: FormBuilder,
               private busquedaService: BusquedaService,
               private candidatoService: CandidatoService,
               private router: Router,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ( { id }) => {
        console.log('id', id );
        // let idParam = id;
        if ( id !== 'nuevo'){
          this.estadoTitulo = false;
          console.log('segundo paso de id: ', id);
          this.cargarCandidato( id );
        }

    });


    this.candidatoForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      busqueda: ['', [Validators.required, Validators.email]]

    });

    this.cargarBusqueda();
    // console.log('candidato seleccionado', this.candidatoSeleccionado);

    this.candidatoForm.get('busqueda').valueChanges
      .subscribe( busquedaId => {
        // console.log(busquedaId);
        console.log('aca tengo en cargarbusqueda pre ', this.candidatoSeleccionado);
        this.busquedaSeleccionada = this.busquedas.find( c => c._id === busquedaId );
        console.log(this.busquedaSeleccionada);
      });
  }


  cargarCandidato (id: string) {

   /*  if ( id === 'nuevo') {
      return;
    } */

    this.candidatoService.obtenerCandidatoPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( candidato => {
          if ( !candidato ) {
            return this.router.navigateByUrl(`/dashboard/candidato`);
          }
          this.candidatoSeleccionado = candidato;
          const { nombre, email, busqueda: { _id }}: any = candidato;
          this.candidatoForm.setValue({ nombre, email, busqueda: _id});

      });
      /* this.candidatoService.obtenerCandidatoPorId( id )
      .subscribe( candidato => {
        console.log('estoy en cargar candidato', candidato);
        const { nombre, busqueda: { _id }} = candidato;
        console.log(nombre, _id);
        this.candidatoSeleccionado = candidato;
      }); */


  }

  finishFunction() {

    console.log('llegue al final');
  }

  cargarBusqueda() {
    this.busquedaService.cargarBusquedas()
      .subscribe( (busquedas: Busqueda[]) => {
        // console.log(busquedas);
        this.busquedas = busquedas;
      });
  }

  guardarCandidato() {
    console.log('hay medico seleccionado para guardar?', this.candidatoSeleccionado);
    const {nombre} = this.candidatoForm.value;

    if ( this.candidatoSeleccionado ) {
      // Actualizar
      const data = {
        ...this.candidatoForm.value,
        _id: this.candidatoSeleccionado._id
      };

      this.candidatoService.actualizarCandidato(data)
        .subscribe( resp => {
          Swal.fire('Listo!', `${ nombre } actualizado correctamente`, 'success');
          });
    } else {
      // crear

      this.candidatoService.crearCandidato( this.candidatoForm.value )
        .subscribe( (resp: any) => {
          console.log(resp);
          Swal.fire('Listo!', `${ nombre } creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/candidato/${ resp.candidato._id }`);
        });

    }

  }

  siguientePaso() {

  }

  get getProgreso1() {
    return `${ this.progreso1}%`;
  }


  get getProgreso2() {
    return `${ this.progreso2}%`;
  }
}
