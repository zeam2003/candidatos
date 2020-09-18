import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { delay, min } from 'rxjs/operators';
import * as moment from 'moment';

import { Busqueda } from '../../../models/busqueda.model';
import { Perfil } from '../../../models/perfil.model';

import { BusquedaService } from '../../../services/busqueda.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { PerfilesService } from '../../../services/perfiles.service';



@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit, OnDestroy {

  public busquedas: Busqueda[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;
  public busquedasTemp: Busqueda[] = [];
  public totalPerfiles: number = 0;
  public perfiles: Perfil[] = [];

  public armado = [];
  public cargado = {};

  public estado: boolean = false;
  public fechaArray: any;


  constructor( private busquedaService: BusquedaService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService,
               private perfilesService: PerfilesService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

   this.cargarBusquedas();

   this.imgSubs = this.modalImagenService.nuevaImagen
   .pipe(
     delay(200)
   )
   .subscribe( img => {
     this.cargarBusquedas();
   } );
   this.fecha();
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.busquedas = this.busquedasTemp;
    }

    this.busquedasService.buscar('busquedas', termino )
      .subscribe( resultados => {
        this.busquedas = resultados;
      } );
  }

  cargarBusquedas() {
    this.cargando = true;

    this.busquedaService.cargarBusquedas()
      .subscribe( busquedas => {
        this.cargando = false;
        this.busquedasTemp = busquedas;
        this.busquedas = busquedas;
        console.log(this.busquedasTemp);
      });
  }

  guardarCambios( busqueda: Busqueda) {
    this.busquedaService.actualizarBusqueda( busqueda._id, busqueda.nombre )
      .subscribe( resp => {
        Swal.fire('Actualizado', busqueda.nombre, 'success');
      });

  }

  eliminarBusqueda( busqueda: Busqueda) {
    this.busquedaService.borrarBusqueda( busqueda._id )
      .subscribe( resp => {
        this.cargarBusquedas();
        Swal.fire('Borrado', busqueda.nombre, 'success');
      });

  }

  fecha() {
    {
      this.busquedaService.cargarBusquedas()
      .subscribe( resp => {

        console.log('Fecha', resp[6].created);
        let ahora = moment().format('l');
        console.log('ahora ', ahora);
      });
    }
  }

  // Crea una nueva busqueda
  async abrirSweetAlert() {

   await Swal.mixin({
    input: 'text',
    confirmButtonText: 'Siguiente',
    showCancelButton: true,
    progressSteps: ['1', '2', '3']
  }).queue([
    {
      title: 'Crear Búsqueda',
      text: 'Ingrese el título',
      input: 'text',

      confirmButtonText: 'Siguiente',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      inputAttributes: {
        minlenght: '3',
        maxlenght: '40'
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Debe escribir el título de la búsqueda!';
        }

        if ( value.length === 0 ) {
          return 'Debes escribir el título!';
        }

        if ( value === '') {
          return 'Debes escribir el título...';
        }
        if ( value.length < 3 ) {
          return 'El título debería ser mas largo...';
        } else if ( value.length > 40 ) {
          return 'El título es muy largo!';
        }

      }
    },
    {
      icon: 'question',
      title: 'Crear Búsqueda',
      text: 'Cantidad de vacantes',
      input: 'range',
      inputAttributes: {
        min: '1',
        max: '120',
        step: '1'
      },
      inputValue: '1',
      confirmButtonText: 'Siguiente',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Ingrese la cantidad de vacantes!';
        }

        if ( value === '0' ) {
          return 'Debe tener al menos una búsqueda...';
        }

      }
    },
    {
      title: 'Crear Búsqueda',
      text: 'Ingrese el detalle',
      input: 'textarea',
      inputPlaceholder: 'Ej: 2 años de experiencia',
      inputAttributes: {
        'aria-label': 'Escriba el detalle aquí...'
      },
      showCancelButton: true
    }

  ]).then((result: any) => {

    if (result.value) {
      this.armado = result.value;

      console.log('datos del arreglo', this.armado);
      Swal.fire({
        title: 'Casi listo!',
        html: `
                  <div>
                    <p>Se creará la siguiente búsqueda: </p>
                  </div>
                  <div>
                    <dl>
                      <dt>Título</dt>
                      <dd><p style="display: block; border: 1px solid #e9ecef; margin: 0 0 0 0;">
                      ${ this.armado[0]}
                      </p></dd>
                    </dl>
                  </div>
                  <div>
                    <dl>
                      <dt>Vacantes</dt>
                      <dd><p style="display: block; border: 1px solid #e9ecef; margin: 0 0 0 0;">
                      ${ this.armado[1]}
                      </p></dd>
                    </dl>
                  </div>
                  <div>
                    <dl>
                      <dt>Detalle</dt>
                      <dd><p style="display: block; border: 1px solid #e9ecef; margin: 0 0 0 0;">
                      ${ this.armado[2]}
                      </p></dd>
                    </dl>
                  </div>
        `,
        confirmButtonText: 'Confirmar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (result) => {
          if ( (this.armado.length > 0 )  ) {

            console.log('estoy aca');
            console.log('Contenido resuelto', result);
            this.busquedaService.crearBusqueda( this.armado[0], this.armado[1] , this.armado[2] )

              .subscribe( ( resp: any) => {
                // this.busquedas.push( resp.Busqueda );
                this.busquedas.push( resp. busqueda );
                this.estado = true;
                console.log(resp);
              });

          } else {
            console.log('se rompio todo perro');
            Swal.fire('Error!', 'Algo salió mal...', 'error');
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // Swal.fire({title: 'hola'} );
          this.abrirToast();
          console.log('se confirmó');
        }
        else {
          Swal.fire('Atención!', 'No se realizaron cambios...', 'warning');
        }
        },
      );

    }

  });

}

  abrirModal( busqueda: Busqueda ) {

    this.modalImagenService.abrirModal('busquedas', busqueda._id, busqueda.img);
  }

  async abrirToast( ) {
    const Toast = await Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    console.log('estoy en el medio del toast');
    Toast.fire({
      icon: 'success',
      title: 'Búsqueda creada correctamente'
    });

    console.log('estoy al fin del toast');
  }


  imprimirHola( busqueda: Busqueda) {
    console.log('hola');
    Swal.fire({
      icon: 'warning',
      title: 'Hay cambios sin guardar...',
      text: 'Deseas mantenerlos?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      footer: '<small>Esta operación no se puede revertir</small>'
    }).then((result: any) => {

      if (result.isConfirmed) {
        // Swal.fire({title: 'hola'} );
        this.guardarCambios(busqueda);
        // this.abrirToast();
        console.log('se confirmó');
      } else {
        Swal.fire('Atención!', 'No se realizaron cambios...', 'warning');

        this.cargarBusquedas();
      }
    });
  }


  // Cargar Perfiles
  cargarPerfiles() {
   this.perfilesService.cargarPerfiles(0)
     .subscribe( ({ total, perfiles}) => {
       this.totalPerfiles = total;
       this.perfiles = perfiles;
       this.cargado = perfiles;
      
     });

  }

  perfil( id: string) {
    Swal.fire({
      title: 'sarasa',
      html: `<button (click)="abrirModal(busqueda")>Hola</button>`
    })
  }
}
