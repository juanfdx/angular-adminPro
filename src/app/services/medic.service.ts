import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { imageUrl } from '../helpers/imageurl';


@Injectable({
  providedIn: 'root'
})
export class MedicService {

  private base_url : string = environment.base_url

  constructor(private http: HttpClient) { }


  //GETTERS:
  public get token(): string {
    return localStorage.getItem('token') || '';
  }

  public get headers() : object {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  /*=====================================================================
   GET ALL MEDICS 
  =====================================================================*/
  getAllMedics(from: number = 0): Observable<any> {
    return this.http.get(`${this.base_url}/medics?from=${from}`, this.headers)
                .pipe(
                  map((res: any) => {

                    res.medics.forEach((medic: any) => {
                      medic.image = imageUrl(this.base_url, medic.image, 'medics')
                    });

                    return res
                  })
                )
  }


}
