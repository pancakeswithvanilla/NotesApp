import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/token/';
  private registerUrl='http://127.0.0.1:8000/api/register/';
  private refreshUrl = 'http://127.0.0.1:8000/api/token/refresh/';
  constructor(private http:HttpClient) { 
  }

  login(credentials:{username:string, password:string}):Observable<any>{
    return this.http.post(this.apiUrl, credentials);

  }
  register(credentials:{username:string, password:string}):Observable<any>{
    return this.http.post(this.registerUrl,credentials )
  }

  saveToken(token:string, refreshtoken:string){
    if (typeof window !== 'undefined' && localStorage){
      localStorage.setItem('jwt_token',token);
      localStorage.setItem('refr_jwt_token', refreshtoken)
    }
  }

  getToken():string|null{
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('jwt_token');
    }
    return null;
  }

  getRefreshToken():string|null{
    if(typeof window !=='undefined' && localStorage)
      {
        return localStorage.getItem('refr_jwt_token');
      }
      return null;
  }

  isAuthenticated(): Observable<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      console.log("No refresh token found.");
      return of(false);
    }
    return this.http.post<any>(this.refreshUrl, { refresh: refreshToken }).pipe(
      catchError(() => {
        console.log("Refresh token expired, logging out...");
        return of(false); 
      })
    );
  }
  
  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('refr_jwt_token');
    }
  }
}
