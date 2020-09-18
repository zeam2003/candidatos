import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Candidato } from '../models/candidato.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  public prueba = [];

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

  // Cargar los candidatos
  cargarCandidatos() {

    const url = `${ base_url }/candidatos`;
    return this.http.get( url, this.headers )
      .pipe(
        map ((resp: { ok: boolean, candidatos: Candidato[] }) => resp.candidatos )
      );
  }

  // Cargar candidato por ID
  obtenerCandidatoPorId( id: string ) {
    console.log('en el servicio tengo :', id)
    const url = `${ base_url }/candidatos/${ id }`;
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: { ok: boolean, candidatos: Candidato }) => resp.candidatos )

      );
  }

  // Crea un candidato
  crearCandidato( candidato: Candidato ) {

    const url = `${ base_url }/candidatos`;
    return this.http.post( url, candidato, this.headers );
  }

  // Actualiza un candidato
  actualizarCandidato( candidato: Candidato ) {

    const url = `${ base_url }/candidatos/${ candidato._id }`;
    return this.http.put( url, candidato, this.headers );
  }

  // Borra un candidato
  borrarCandidato( _id: string ) {

    const url = `${ base_url }/candidatos/${ _id }`;
    return this.http.delete( url, this.headers );
  }

  // Actualizar estado {
  actualizarEstado( candidato: Candidato ) {

    return this.http.put(`${base_url}/candidatos/${ candidato._id }`, candidato, this.headers);
  }
}
