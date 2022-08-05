import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//guard
import { AuthGuard } from '../guards/auth.guard';
//components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicsComponent } from './medics/medics.component';


const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Configuración' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil' } },
      { path: 'users', component: UsersComponent, data: { title: 'Usuarios' } },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitales' } },
      { path: 'medics', component: MedicsComponent, data: { title: 'Médicos' } },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
