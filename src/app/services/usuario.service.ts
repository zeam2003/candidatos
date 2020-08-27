import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment.prod';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';


const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone) {

    this.googleInit();
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
    const token = localStorage.getItem('token') || '';

    return this.http.get( `${base_url}/login/renew`, {
      headers: {
        'x-token':  token
      }
    }).pipe(
      tap ( (resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
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
}
