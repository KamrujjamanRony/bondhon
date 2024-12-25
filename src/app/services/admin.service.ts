import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  urlAdmin = 'http://localhost:1001/api/Admin';

  http = inject(HttpClient);

  addAdmin(model: any | FormData): Observable<void>{
    return this.http.post<void>(this.urlAdmin, model)
  }

  getAllAdmins(): Observable<any[]> {
    return this.http.post<any[]>(this.urlAdmin + '/SearchAdmin', {});
  }

  getAdmin(username: any, password: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/admins?username=${username}&password=${password}`, {});
  }
  // getAdmin(username: any, password: any): Observable<any> {
  //   return this.http.get<any>(this.urlAdmin + `/SearchAdmin?username=${username}&password=${password}`);
  // }

  updateAdmin(id: any, updateAdminRequest: any | FormData): Observable<any>{
    return this.http.put<any>(this.urlAdmin + `/EditReg/${id}`, updateAdminRequest);
  }

  deleteAdmin(id: any): Observable<any>{
    return this.http.post<any>(this.urlAdmin + `/DeleteAddress?id=${id}`, {});
  }
}
