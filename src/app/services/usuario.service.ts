import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


import { environment } from '../../environments/environment.prod';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';



const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone) {

    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  googleInit() {

    return new Promise( resolve => {

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '634993232270-mksmrho0f4cik2mt0ts905sfak2s1i2a.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });

        resolve();
      });

    });

  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });

  }

  // Validar Token
  validarToken(): Observable<boolean> {

    return this.http.get( `${base_url}/login/renew`, {
      headers: {
        'x-token':  this.token
      }
    }).pipe(
      map ( (resp: any) => {

        const {
          email,
          google,
          nombre,
          role,
          img = '',
          uid
        } = resp.usuario;

        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

        localStorage.setItem('token', resp.token);
        return true;
      }),

      catchError( error => of(false) )
    );
  }


  // Creación de Usuario

  crearUsuario( formData: RegisterForm ) {

    return this.http.post( `${base_url}/usuarios`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );
  }


  // Actualizar Perfil
  actualizarPerfil( data: { email: string, nombre: string, role?: string, estado?: boolean}) {

    data = {
      ...data,
      role: this.usuario.role,
      estado: this.usuario.estado
    };

    return this.http.put( `${base_url}/usuarios/${ this.uid }`, data, this.headers);
  }

  // Actualizar estado {
  actualizarEstado( usuario: Usuario ) {
    return this.http.put(`${base_url}/usuarios/${ this.uid }`, usuario, this.headers);
  }
  
  // Login / Ingreso Normal

  login( formData: LoginForm ) {

    return this.http.post( `${base_url}/login`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );
  }

  // login google
  loginGoogle( token ) {

    return this.http.post( `${base_url}/login/google`, {token})
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token);
                    // console.log('guardo token', resp.token);
                  })
                );
  }

  cargarUsuarios( desde: number = 0) {

    const url = `${base_url}/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>( url, this.headers )
      .pipe(
        map( resp => {
          const usuarios = resp.usuarios
          .map( user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.estado, user.uid));
          return {
            total: resp.total,
            usuarios
          };
        })
      );
  }

  eliminarUsuario( usuario: Usuario ) {
    const url = `${base_url}/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers );
  }

  guardarUsuario( usuario: Usuario) {


    return this.http.put( `${base_url}/usuarios/${ usuario.uid }`, usuario, this.headers);
  }

}
