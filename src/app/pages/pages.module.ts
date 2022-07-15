import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//components
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports : [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }
