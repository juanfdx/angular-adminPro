import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicsComponent } from './medics/medics.component';
import { MedicComponent } from './medic/medic.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [

  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Configuración' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Perfil' } },
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitales' } },
  { path: 'medics', component: MedicsComponent, data: { title: 'Médicos' } },
  { path: 'medic/:id', component: MedicComponent, data: { title: 'Médico' } },
  { path: 'search/:term', component: SearchComponent, data: { title: 'Search' } },
  //Admin routes
  { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Usuarios' } },
]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
