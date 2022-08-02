import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
//helpers
import { imageUrl } from '../helpers/imageurl';
//interfaces
import { LoginForm } from '../interfaces/login-form.interface';
import { ProfileForm } from '../interfaces/profile-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { User } from '../interfaces/user.interface';

// const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base_url  : string = environment.base_url
  public user!      : User

  public userSource = new BehaviorSubject<User>(
    {
      id       : '',
      name     : '',
      lastName : '',
      email    : '',
      image    : '',
      role     : 'USER_ROLE',
      status   : 'inactive'
    }
  ) 
  public user$ = this.userSource.asObservable()  


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
                  map( (res:any) => {

                    this.user = res.user
                    //si no tiene imagen asignamos una por defecto
                    this.user.image = imageUrl(this.base_url, res.user.image)
                    //mandamos el user como observable a toda la app
                    this.userSource.next(this.user)

                    this.saveLocalStorage(res.token, res.menu);
        
                    return true;
                  }),
                  catchError( error => of(false))
                )
  }

/*===========================================================
  CREATE USER - user register
============================================================*/
  createUser(formData: RegisterForm): Observable<any> {
    return this.http.post(`${this.base_url}/users`, formData)
                .pipe(
                  tap((res: any) => this.saveLocalStorage(res.token, res.menu)))
  }  

/*===========================================================
  UPDATE USER
============================================================*/
  updateUser(formData: ProfileForm, userId: string): Observable<any> {
    //agregamos el role al formData
    const data = {
      ...formData,
      role: this.user.role,
    }

    return this.http.put(`${this.base_url}/users/${userId}`, data, this.headers)
                .pipe(
                  map((res:any) => {
                    this.user = res.user
                    //si no tiene imagen asignamos una por defecto
                    this.user.image = imageUrl(this.base_url, res.user.image)
                    //mandamos el user como observable a toda la app
                    this.userSource.next(this.user)
                    
                    return res
                  })
                )
  }


/*===========================================================
  LOGIN
============================================================*/
  login(formData: LoginForm): Observable<any> {
    return this.http.post<LoginForm>(`${this.base_url}/login`, formData)
                .pipe(
                  tap((res: any) => this.saveLocalStorage(res.token, res.menu)))
  }

/*===========================================================
  LOGOUT
============================================================*/
  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.router.navigateByUrl('/login');
  }

}
