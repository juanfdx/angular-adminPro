import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleMenuService } from 'src/app/services/toggle-menu.service';

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

  public listObservers$: Subscription[] = [];


  constructor(private toggleMenuService: ToggleMenuService) { }

  ngOnInit(): void {
    this.toggleMenu()
    this.closeDropdowns()
    this.screenWidth = window.innerWidth
    if (this.screenWidth >= 1170) { this.active = true }
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

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }

}
