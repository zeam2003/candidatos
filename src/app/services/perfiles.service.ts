import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Perfil } from '../models/perfil.model';

import { PerfilUsuario } from '../interfaces/cargar-perfil.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  public perfil: Perfil;

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

  // Obtener perfiles
  cargarPerfiles( desde: number = 0) {

    const url = `${ base_url}/perfiles?desde=${desde}`;
    return this.http.get<PerfilUsuario>( url, this.headers )
      .pipe(
        map( resp => {
          const perfiles = resp.perfiles
          .map (perfil => new Perfil(perfil.nombre, perfil._id, perfil.usuario, perfil.created ));
          return {
            total: resp.total,
            perfiles
          };
        })
      );

  }
}
