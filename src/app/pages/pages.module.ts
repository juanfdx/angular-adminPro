import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//components
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PageError404Component } from './page-error404/page-error404.component';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PageError404Component,
    PagesComponent
  ],
  exports : [
    DashboardComponent,
    PageError404Component,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }
