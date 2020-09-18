import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Busqueda } from '../models/busqueda.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {



  constructor( private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  // Cargar Busquedas
  cargarBusquedas() {

    const url = `${base_url}/busquedas`;
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, busquedas: Busqueda[] }) => resp.busquedas)
      );
  }

  // Cargar Busquedas
  crearBusqueda(nombre: string, vacantes: string, detalle: string) {

    const url = `${base_url}/busquedas`;
    return this.http.post( url, { nombre, vacantes, detalle }, this.headers );
  }

  // Actualizar Busqueda
  actualizarBusqueda( _id: string, nombre: string ) {
    const url = `${base_url}/busquedas/${ _id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  // Borrar Busqueda
  borrarBusqueda( _id: string ) {
    const url = `${base_url}/busquedas/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
