import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  public modalSource = new BehaviorSubject<any>({})
  public modal$ = this.modalSource.asObservable() 


  constructor() { }

}
