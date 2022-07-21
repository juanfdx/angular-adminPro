import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleMenuService } from 'src/app/services/toggle-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public active : boolean = false

  private subscription$!: Subscription;


  constructor(private toggleMenuService: ToggleMenuService) { }

  ngOnInit(): void {
    this.toggleMenu()
  }

  toggleMenu(): void {
    this.subscription$ = this.toggleMenuService.toggleMenu$.subscribe((res: boolean) => {
      this.active = res   
    })
  }

  setActiveMenu(): void {
    this.active = !this.active
    this.toggleMenuService.toggleMenuSource.next(this.active)
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
