import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleMenuService } from 'src/app/services/toggle-menu.service';
import { sidebarWidth } from 'src/app/helpers/sidebarWidth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public active       : boolean = false
  public screenWidth  : number = 0
  public sidebarWidth : number = 0

  private subscription$!: Subscription;

  constructor(private toggleMenuService: ToggleMenuService) { }

  ngOnInit(): void {
    this.toggleMenu()
    this.screenWidth = window.innerWidth
    this.sidebarWidth = sidebarWidth(this.screenWidth, this.active)  
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    this.screenWidth = event.target.innerWidth;
    (this.screenWidth >= 1170) ? this.active = true : this.active = false
      
    this.toggleMenuService.toggleMenuSource.next(this.active) 
    this.sidebarWidth = sidebarWidth(this.screenWidth, this.active)
  }

  toggleMenu(): void {
    this.subscription$ = this.toggleMenuService.toggleMenu$.subscribe((res: boolean) => {
      this.active = res 
      this.sidebarWidth = sidebarWidth(this.screenWidth, this.active)
    })
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
