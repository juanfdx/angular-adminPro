import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes.service';
import { ToggleMenuService } from 'src/app/services/toggle-menu.service';
import { SwitchLangService } from 'src/app/services/switch-lang.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
//interfaces
import { Theme } from 'src/app/interfaces/theme.interface';
import { User } from 'src/app/interfaces/user.interface';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public active      : boolean = false
  public dropProfile : boolean = false
  public dropLang    : boolean = false
  public searchForm  : boolean = false
  public screenWidth : number = 0
  public theme       : any
  public user        : any
  public langActive  : string = 'es'

  public listObservers$: Subscription[] = [];


  constructor(private toggleMenuService: ToggleMenuService,
              private themesService: ThemesService,
              private userService: UserService,
              private switchLangService: SwitchLangService) { }


  ngOnInit(): void {
    this.setTheme()
    this.setLangActive()
    this.toggleMenu()
    this.closeDropdowns()
    this.screenWidth = window.innerWidth
    if (this.screenWidth >= 1170) { this.active = true }

    const observer4$ = this.userService.user$.subscribe( (res: User) => {
      this.user = res    
     })
    this.listObservers$.push(observer4$)  
  }

  setLangActive(): void {
    const observer5$ = this.switchLangService.lang$.subscribe( lang => {
      this.langActive = lang
    })
    this.listObservers$.push(observer5$)  
  }

  toggleMenu(): void {
    const observer1$ = this.toggleMenuService.toggleMenu$.subscribe((res: boolean) => {
      this.active = res   
    })
    this.listObservers$.push(observer1$)
  }

  setActiveMenu(): void {
    this.active = !this.active
    this.toggleMenuService.toggleMenuSource.next(this.active)
    // this.dropProfile = false
    // this.dropLang = false
  }

  dropdownProfile(): void {
    this.dropProfile = !this.dropProfile
    this.dropLang = false
  }

  dropdownLang(): void {
    this.dropLang = !this.dropLang
    this.dropProfile = false
  }

  closeDropdowns(): void {
    const observer2$ = this.toggleMenuService.closeDropdown$.subscribe((res: boolean) => {
      this.dropLang = false
      this.dropProfile = false 
    }) 
    this.listObservers$.push(observer2$)
  }

  showSearchForm(): void {
    this.searchForm = !this.searchForm
  }

  setTheme(): void {
    const observer3$ = this.themesService.theme$.subscribe((res: Theme) => {
      this.theme = res
    })
    this.listObservers$.push(observer3$)
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }

}
