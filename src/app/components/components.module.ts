import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//components
import { PanelButtonComponent } from './panel-button/panel-button.component';


@NgModule({
  declarations: [
    PanelButtonComponent
  ],
  exports: [
    PanelButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
