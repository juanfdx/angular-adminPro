import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//components
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    PageWrapperComponent
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    PageWrapperComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
