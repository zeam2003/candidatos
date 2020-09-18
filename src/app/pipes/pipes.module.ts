import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { MomentFechaPipe } from './moment-fecha.pipe';



@NgModule({
  declarations: [ ImagenPipe, MomentFechaPipe],
  exports: [ ImagenPipe, MomentFechaPipe ]
})
export class PipesModule { }
