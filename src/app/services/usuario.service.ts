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
import Swal from 'sweetalert2';


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
    console.log(this.usuario);
  }

  get uid(): string {
    console.log(this.usuario.uid);
    return this.usuario.uid || '';

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  guardarLocalStorage( token: string, menu: any ) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
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
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });

  }

  // borrar TODO

  // Validar Token
  validarToken(): Observable<boolean> {

    return this.http.get( `${base_url}/login/renew`, {
      headers: {
        'x-token':  this.token
      }
    })
    .pipe(
      tap( (resp: any) => {
        console.log(resp);
        const {
          email,
          google,
          nombre,
          role,
          img,
          estado,
          uid
        } = resp.usuario;

        this.usuario = new Usuario( nombre, email, '', img, google, role, estado, uid );
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
      catchError( error => {
        console.log(error);
        return  of(false);
      })
    );
  }


  // Creación de Usuario

  crearUsuario( formData: RegisterForm ) {

    return this.http.post( `${base_url}/usuarios`, formData)
                .pipe(
                  tap( (resp: any) => {
                    this.guardarLocalStorage(resp.token, resp.menu);
                  })
                );
  }


  // Actualizar Perfil
  actualizarPerfil( data: { email: string, nombre: string, role?: string, estado?: boolean}) {
    console.log('usuario en actualizar perfil', this.uid);
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
                    this.guardarLocalStorage(resp.token, resp.menu);
                  })
                );
  }

  // login google
  loginGoogle( token ) {

    return this.http.post( `${base_url}/login/google`, {token})
                .pipe(
                  tap( (resp: any) => {
                    this.guardarLocalStorage(resp.token, resp.menu);
                    // console.log('guardo token', resp.token);
                  })
                );
  }

  cargarUsuarios( desde: number = 0) {

    const url = `${base_url}/usuarios?desde=${ desde }`;

    try {
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
    } catch (error) {
      Swal.fire('Algo salió mal!', 'no se pudieron cargar los usuarios...', 'error' );
    }

  }

  eliminarUsuario( usuario: Usuario ) {
    const url = `${base_url}/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers );
  }

  guardarUsuario( usuario: Usuario) {


    return this.http.put( `${base_url}/usuarios/${ usuario.uid }`, usuario, this.headers);
  }

}
