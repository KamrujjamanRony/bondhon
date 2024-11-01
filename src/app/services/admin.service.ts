import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  http = inject(HttpClient);

  addAdmin(model: any | FormData): Observable<void>{
    return this.http.post<void>('http://localhost:3000/admins', model)
  }

  getAllAdmins(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/admins');
  }

  getAdmin(username: any, password: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/admins?username=${username}&password=${password}`);
  }

  updateAdmin(id: any, updateAdminRequest: any | FormData): Observable<any>{
    return this.http.put<any>(`http://localhost:3000/admins/${id}`, updateAdminRequest);
  }

  deleteAdmin(id: any): Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/admins/${id}`);
  }
}
