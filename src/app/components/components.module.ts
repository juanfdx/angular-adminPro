import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//components
import { PanelButtonComponent } from './panel-button/panel-button.component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { LangDropdownComponent } from './lang-dropdown/lang-dropdown.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SidebarIconComponent } from './sidebar-icon/sidebar-icon.component';


@NgModule({
  declarations: [
    PanelButtonComponent,
    ProfileDropdownComponent,
    LangDropdownComponent,
    SearchFormComponent,
    SidebarIconComponent,
  ],
  exports: [
    PanelButtonComponent,
    ProfileDropdownComponent,
    LangDropdownComponent,
    SearchFormComponent,
    SidebarIconComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
