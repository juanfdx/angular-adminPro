import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

// const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base_url : string = environment.base_url

  constructor(private http: HttpClient,
              private router: Router) { }


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


/*===========================================================
  SAVE LOCALSTORAGE
============================================================*/
  saveLocalStorage( token: string, menu: any ) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

/*===========================================================
  RENEW TOKEN
============================================================*/
  validateToken(): Observable<boolean> {
    //en this.headers mandamos el x-token
    return this.http.get(`${this.base_url}/login/renew`, this.headers)
                .pipe(
                  //de la res obtenemos el token renovado
                  tap( (res: any) => localStorage.setItem('token', res.token)),
                  //debemos devolver un true o false para el authGuard, con map, 
                  //si hay respuesta, que sea true
                  map( (res: any) => true ),
                  //si hay error, con of, creamos un nuevo observable que manda un false
                  catchError( error => of(false))
                )
  }


/*===========================================================
  CREATE USER - user register
============================================================*/
  createUser(formData: RegisterForm): Observable<any> {
    return this.http.post<RegisterForm>(`${this.base_url}/users`, formData)
                .pipe(
                  tap( (res: any) => localStorage.setItem('token', res.token))
                )
  }             

/*===========================================================
  LOGIN
============================================================*/
  login(formData: LoginForm): Observable<any> {
    return this.http.post<LoginForm>(`${this.base_url}/login`, formData)
                .pipe(
                  tap( (res: any) => localStorage.setItem('token', res.token))
                )
  }

/*===========================================================
  LOGOUT
============================================================*/
  logout() {

    localStorage.removeItem('token');
    // localStorage.removeItem('menu');

    this.router.navigateByUrl('/login');
  }

}
