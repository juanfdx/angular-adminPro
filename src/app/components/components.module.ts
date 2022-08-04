import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
//components
import { PanelButtonComponent } from './panel-button/panel-button.component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { LangDropdownComponent } from './lang-dropdown/lang-dropdown.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SidebarIconComponent } from './sidebar-icon/sidebar-icon.component';
import { SearchMaintComponent } from './search-maint/search-maint.component';
import { LoadingMaintComponent } from './loading-maint/loading-maint.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { ModalImageComponent } from './modal-image/modal-image.component';


@NgModule({
  declarations: [
    PanelButtonComponent,
    ProfileDropdownComponent,
    LangDropdownComponent,
    SearchFormComponent,
    SidebarIconComponent,
    SearchMaintComponent,
    LoadingMaintComponent,
    TableUsersComponent,
    ModalImageComponent,
  ],
  exports: [
    PanelButtonComponent,
    ProfileDropdownComponent,
    LangDropdownComponent,
    SearchFormComponent,
    SidebarIconComponent,
    SearchMaintComponent,
    LoadingMaintComponent,
    TableUsersComponent,
    ModalImageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class ComponentsModule { }
