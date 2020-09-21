import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { CandidatosComponent } from './mantenimientos/candidatos/candidatos.component';
import { BusquedasComponent } from './mantenimientos/busquedas/busquedas.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { CandidatoComponent } from './mantenimientos/candidatos/candidato.component';
import { BuscadorComponent } from './buscador/buscador.component';




const routes: Routes = [

    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
          { path: 'graficas', component: GraficasComponent, data: { titulo: 'Graficas' } },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progreso' } },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Preferencias' } },
          { path: 'buscador/:termino', component: BuscadorComponent, data: { titulo: 'Buscador' } },
          { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'rxjs' } },
          { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },

          // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

          // Mantenimientos
          { path: 'candidatos', component: CandidatosComponent, data: { titulo: 'Candidatos registrados' } },
          { path: 'candidato/:id', component: CandidatoComponent, data: { titulo: 'Candidatos registrados' } },
          { path: 'busquedas', component: BusquedasComponent, data: { titulo: 'Busquedas registradas'  } },
          { path: 'clientes', component: ClientesComponent, data: { titulo: 'Clientes registrados' } },

          // Rutas de Admin
          { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios registrados' } },
        ]
      },

    // { path: 'path/:routeParam', component: MyComponent },
    // { path: 'staticPath', component: ... },
    // { path: '**', component: ... },
    // { path: 'oldPath', redirectTo: '/staticPath' },
    // { path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
