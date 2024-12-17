import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlUser = 'http://localhost:1001/api/DonerReg';

  http = inject(HttpClient);

  addUser(model: any | FormData): Observable<void>{
    return this.http.post<void>(this.urlUser, model)
  }

  getAllUsers(): Observable<any[]> {
    return this.http.post<any[]>(this.urlUser + '/SearchDonerReg', {});
  }

  getUser(phone: any): Observable<any> {
    return this.http.post<any>(this.urlUser + `/SearchDonerReg?Search=${phone}`, {});
  }

  updateUser(id: any, updateUserRequest: any | FormData): Observable<any>{
    return this.http.put<any>(this.urlUser + `/EditReg/${id}`, updateUserRequest);
  }

  deleteUser(id: any): Observable<any>{
    return this.http.post<any>(this.urlUser + `/DeleteAddress?id=${id}`, {});
  }
}
