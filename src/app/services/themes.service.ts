import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '../interfaces/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  public themeSource = new BehaviorSubject<Theme>(
    {
      id      : 1,
      color   : 'grey',
      header  : '#98ABB4',
      sidebar : '#FFFFFF'
    }
  )
  public theme$ = this.themeSource.asObservable()

  
  constructor(private http: HttpClient) { }

  getThemes(): Observable<Theme[]>  {
    return this.http.get<Theme[]>('/assets/data/data-themes.json')
  }
}
