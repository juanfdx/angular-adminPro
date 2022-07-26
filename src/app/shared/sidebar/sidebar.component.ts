import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Theme } from 'src/app/interfaces/theme.interface';
import { ThemesService } from 'src/app/services/themes.service';
import { ToggleMenuService } from 'src/app/services/toggle-menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public active      : boolean = false
  public position    : number = -1
  public sideMenu    : number = -1
  public screenWidth : number = 0
  public theme       : any


  public listObservers$: Subscription[] = [];

  constructor(private toggleMenuService: ToggleMenuService,
              private themesService: ThemesService) { }

  ngOnInit(): void {
    this.setTheme()
    this.toggleMenu()
    this.screenWidth = window.innerWidth
    if (this.screenWidth >= 1170) { this.active = true }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    this.screenWidth = event.target.innerWidth;
    (this.screenWidth >= 1170) ? this.active = true : this.active = false
      
    this.toggleMenuService.toggleMenuSource.next(this.active) 
  }

  toggleMenu(): void {
    const observer1$ = this.toggleMenuService.toggleMenu$.subscribe((res: boolean) => {
      this.active = res 
    })
    this.listObservers$.push(observer1$)
  }

  setPosition(index: number): void {
    (this.position === index) ? this.position = -1 : this.position = index
  }

  showSideMenu(index: number): void {
    if (!this.active) { this.sideMenu = index } 
  }

  hideSideMenu(): void {
    if (!this.active) { this.sideMenu = -1 } 
  }

  setTheme(): void {
    const observer2$ = this.themesService.theme$.subscribe((res: Theme) => {
      this.theme = res
    })
    this.listObservers$.push(observer2$)
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }
}
