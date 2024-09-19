import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  addUser(model: any | FormData): Observable<void>{
    return this.http.post<void>('http://localhost:3000/users', model)
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/users');
  }

  getUser(phone: any, password: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/users?phone=${phone}&password=${password}`);
  }

  updateUser(id: any, updateUserRequest: any | FormData): Observable<any>{
    return this.http.put<any>(`http://localhost:3000/users/${id}`, updateUserRequest);
  }

  deleteUser(id: any): Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/users/${id}`);
  }
}
