import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//components
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  exports : [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }
