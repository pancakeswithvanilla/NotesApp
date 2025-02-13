import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  saveToken(token:string){
    if (typeof window !== 'undefined' && localStorage){
      localStorage.setItem('jwt_token',token);
    }
  }

  getToken():string|null{
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('jwt_token');
    }
    return null;
  }

  isAuthenticated():boolean{
    if (this.getToken()){
      return true;
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('jwt_token');
    }
  }
}
