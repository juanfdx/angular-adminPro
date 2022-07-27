import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Theme } from 'src/app/interfaces/theme.interface';
import { ThemesService } from 'src/app/services/themes.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  public theme : any
  public listObservers$: Subscription[] = [];


  constructor(private themesService: ThemesService) { }

  ngOnInit(): void {
    this.setTheme()
  }

  setTheme(): void {
    const observer1$ = this.themesService.theme$.subscribe((res: Theme) => {
      this.theme = res
    })
    this.listObservers$.push(observer1$)
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }

}
