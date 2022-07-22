import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//components
import { PanelButtonComponent } from './panel-button/panel-button.component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { LangDropdownComponent } from './lang-dropdown/lang-dropdown.component';
import { SearchFormComponent } from './search-form/search-form.component';


@NgModule({
  declarations: [
    PanelButtonComponent,
    ProfileDropdownComponent,
    LangDropdownComponent,
    SearchFormComponent
  ],
  exports: [
    PanelButtonComponent,
    ProfileDropdownComponent,
    LangDropdownComponent,
    SearchFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
