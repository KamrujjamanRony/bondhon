import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  urlAdmin = 'https://a.bandhanblood.com/api/Admin';

  http = inject(HttpClient);

  addAdmin(model: any | FormData): Observable<void> {
    return this.http.post<void>(this.urlAdmin, model)
  }

  getAdmin(query: any): Observable<any[]> {
    return this.http.post<any[]>(this.urlAdmin + '/Search', { "search": query });
  }

  loginAdmin(mobileNo: any, password: any): Observable<any> {
    const loginData = {
      "mobileNo": mobileNo,
      "password": password
    }
    return this.http.post<any>(this.urlAdmin + `/Login`, loginData);
  }

  updateAdmin(id: any, updateAdminRequest: any | FormData): Observable<any> {
    return this.http.put<any>(this.urlAdmin + `/Edit/${id}`, updateAdminRequest);
  }

  deleteAdmin(id: any): Observable<any> {
    return this.http.delete<any>(this.urlAdmin + `/Delete?id=${id}`);
  }
}
