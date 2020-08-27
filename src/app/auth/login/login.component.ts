import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmited = false;
  public auth2: any;

  loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email, Validators.minLength(3)]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
    remember: [false]
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone) { }


  ngOnInit(): void {
    this.renderButton();
  }

  login() {

    this.usuarioService.login( this.loginForm.value)
       .subscribe( resp => {
         // console.log(resp);
         if ( this.loginForm.get('remember').value) {
           localStorage.setItem('email', this.loginForm.get('email').value);
         } else {
           localStorage.removeItem('email');
         }

          // Navegar al login
         this.router.navigateByUrl('/');
       }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
       });
    // console.log( this.loginForm.value);
  }

  // Login Google

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.starApp();
  }

  async starApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    // console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);
        this.usuarioService.loginGoogle(id_token)
              .subscribe( resp => {
                // Navegar al dashboard
                this.ngZone.run(() => {
                  this.router.navigateByUrl('/');
                });
              });
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
        Swal.fire('Error', error.error.msg, 'error');
      });
  }
}
