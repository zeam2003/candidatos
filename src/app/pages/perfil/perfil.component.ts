import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService) {

    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil( this.perfilForm.value)
        .subscribe( () => {
          const { nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
          Swal.fire('Usuario Actualizado!', nombre, 'success');
        }, (err) => {
          // console.log(err.error.msg);
          Swal.fire('Error!', err.error.msg, 'error');
        });
  }

  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      console.log(reader.result);
    };
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
    // al pasar por referencia se actualiza automaticamente
        .then( img => {
          this.usuario.img = img;
          Swal.fire('Guardado!', 'Imagen de usuario actualizada', 'success');
        }, (err) => {
           // console.log(err.error.msg);
           Swal.fire('Error!', 'No se pudo subir la imagen', 'error');
        } );

  }

}
