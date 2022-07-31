import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//guard
import { AuthGuard } from '../guards/auth.guard';
//components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Settings' } },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
