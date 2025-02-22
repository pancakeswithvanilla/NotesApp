import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
private apiUrl = 'http://127.0.0.1:8000/api/teachers/'
  constructor(private http:HttpClient, private authService:AuthService) { } 
  getHeaders():HttpHeaders{
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    });
  }
  getTeachers():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl, {headers:this.getHeaders()});
  }
  getSubjects():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}subjects/`,{headers:this.getHeaders()})
  }
  createTeacher(teacherData:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}create/`, teacherData, {headers:this.getHeaders()});
  }
  createSubject(subjectData:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}createsubject/`,subjectData, {headers:this.getHeaders()});
  }
  deleteSubject(subjectId:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}deletesubject/`, {headers:this.getHeaders()})
  }
  deleteTeacher(teacherId:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}delete/${teacherId}`, {headers:this.getHeaders()});
  }
  editTeacher(teacherId:number, teacherData:any):Observable<any>{
    console.log("edit teacher data", teacherData)
    return this.http.put<any>(`${this.apiUrl}edit/${teacherId}/`, teacherData, {headers:this.getHeaders()})
  }
}
