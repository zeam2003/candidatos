import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebardComponent } from './sidebard/sidebard.component';
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebardComponent,
    HeaderComponent
  ],
  exports: [
    BreadcrumbsComponent,
    SidebardComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
