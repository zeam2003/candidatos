import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficasComponent } from './graficas/graficas.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { BusquedasComponent } from './mantenimientos/busquedas/busquedas.component';
import { CandidatosComponent } from './mantenimientos/candidatos/candidatos.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { PipesModule } from '../pipes/pipes.module';
import { CandidatoComponent } from './mantenimientos/candidatos/candidato.component';
import { ArchwizardModule } from 'angular-archwizard';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraficasComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    BusquedasComponent,
    CandidatosComponent,
    ClientesComponent,
    CandidatoComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraficasComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    PipesModule,
    ArchwizardModule
   ]
})
export class PagesModule { }
