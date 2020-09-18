import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Busqueda } from '../models/busqueda.model';
import { Candidato } from '../models/candidato.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }

  private transformarBusquedas( resultados: any[] ): Busqueda[] {

    return resultados;
  }

  private transformarCandidatos( resultados: any[] ): Candidato[] {

    return resultados;
  }

  buscar (
      tipo: 'usuarios'|'candidatos'|'busquedas',
      termino: string = ''
    ) {

    const url = `${base_url}/todo/coleccion/${ tipo }/${ termino }`;
    return this.http.get<any[]>( url, this.headers )
        .pipe(
          map( (resp: any) => {
            switch (tipo) {
              case 'usuarios':
                return this.transformarUsuarios( resp.resultados );

              case 'busquedas':
                return this.transformarBusquedas( resp.resultados );

              case 'candidatos':
                return this.transformarCandidatos( resp.resultados ); 
              default:
                return [];
            }
          })
        );
  }
}
