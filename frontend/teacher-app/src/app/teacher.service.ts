import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
private apiUrl = 'http://127.0.0.1:8000/api/teachers/'
  constructor(private http:HttpClient) { } //why define in the constructor this http thingy?
  getTeachers():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }
  
  createTeacher(teacherData:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}create/`, teacherData);
  }
  deleteTeacher(teacherId:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}delete/${teacherId}`);
  }
  editTeacher(teacherId:number, teacherData:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}edit/${teacherId}/`, teacherData)
  }
}
