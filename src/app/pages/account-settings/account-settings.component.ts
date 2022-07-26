import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/interfaces/theme.interface';
import { ThemesService } from 'src/app/services/themes.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  public lightThemes : Theme[] = []
  public darkThemes  : Theme[] = []
  public appTheme : string = 'grey'


  constructor(private themesService: ThemesService) { }

  ngOnInit(): void {
    this.getThemes()
  }

  getThemes(): void {
    this.themesService.getThemes().subscribe((res: Theme[]) => {
      this.lightThemes = res.filter((theme, i) => i < 6)
      this.darkThemes = res.filter((theme, i) => i >= 6)
    })
  }

  setTheme(theme: Theme): void {
    const {color} = theme
    this.appTheme = color
    this.themesService.themeSource.next(theme)
  }

}
