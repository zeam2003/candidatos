import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent{

  public formSubmited = false;

  registerForm = this.fb.group({

    nombre: ['test', [ Validators.required, Validators.minLength(3)]],
    email: ['test@test.com', [ Validators.required, Validators.email, Validators.minLength(3)]],
    password: ['123456', [ Validators.required, Validators.minLength(6)]],
    password2: ['1234567', [ Validators.required, Validators.minLength(6)]],
    terminos: [false, [ Validators.required]],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder, 
               private usuarioService: UsuarioService,
               private router: Router) { }

  crearUsuario() {
    this.formSubmited = true;
    console.log(this.registerForm.value);

    if ( this.registerForm.invalid ) {
      return;
    }

    // realizar el posteo
    this.usuarioService.crearUsuario( this.registerForm.value )
        .subscribe( resp => {
          // Navegar al dashboard
          this.router.navigateByUrl('/');
        }, (err) => {
          // si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  campoNoValido( campo: string ): boolean {

    if ( this.registerForm.get(campo).invalid && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ( (pass1 !== pass2) && this.formSubmited ) {
      return true;
    } else {
      return false;
    };
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmited;
  }

  passwordsIguales( pass1Name: string, pass2Name: string) {

    return ( formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }

}
