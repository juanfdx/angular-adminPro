import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuService {

  public toggleMenuSource = new BehaviorSubject<boolean>(false)
  public toggleMenu$ = this.toggleMenuSource.asObservable()

  constructor() { }
}
