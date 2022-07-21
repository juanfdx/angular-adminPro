import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleMenuService } from 'src/app/services/toggle-menu.service';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent implements OnInit {

  public active : boolean = false

  private subscription$! : Subscription;

  constructor(private toggleMenuService: ToggleMenuService) { }

  ngOnInit(): void {
    this.toggleMenu()
  }

  toggleMenu(): void {
    this.subscription$ = this.toggleMenuService.toggleMenu$.subscribe((res: boolean) => {
      this.active = res 
    })
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
