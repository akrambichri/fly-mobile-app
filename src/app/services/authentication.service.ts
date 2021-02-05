import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


const TOKEN_KEY = 'jwt-token';


@Injectable({
    providedIn: "root"
})
export class AuthenticationService {
  private url = 'http://localhost:8000/api';
  public user = null;
  constructor(private http: HttpClient, private router: Router
    ) {
     this.loadUserFromStorage()
      }


  register(user: User) {
    return this.http.post<{ data: any }>(`${this.url}/register`, user).pipe(
      map(response => response.data.access_token)
    );
  }

  login(credentials: User): Observable<string> {
    return this.http.post<{ data: any }>(`${this.url}/login`, credentials).pipe(
      map(response => response.data.access_token)
    );
  }

    getUser() {
      const token = localStorage.getItem('access_token');
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + token
      });
     return this.http.get<{ data: any }>(`${this.url}/user-profile`,{ headers }).pipe(
        map(response => response.data.user)
      );
    }

    logout() {
      localStorage.clear();
      this.user = null;
      console.log(this.user);
      this.http.get<{ data: any }>(`${this.url}/logout`);
      this.router.navigateByUrl('/login');
    }

    loadUserFromStorage(){
      const token = localStorage.getItem('access_token');
      if(token){
        this.getUser().subscribe(
          async user => {
          this.user = user;
          this.router.navigateByUrl('/');
          },
          async () => {
          this.user =null;
          }
        )

      }
    }
}
