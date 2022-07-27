import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  constructor(private http: HttpClient) { }


  getSidebarMenu(): Observable<any> {
    return this.http.get<any>('/assets/data/data-sidebar.json')
  }
}
