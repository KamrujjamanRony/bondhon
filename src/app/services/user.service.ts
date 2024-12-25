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

  getAllUsers(query: any): Observable<any[]> {
    return this.http.post<any[]>(this.urlUser + `/SearchDonerReg?Search=${encodeURIComponent(query)}`, {});
  }

  searchUsers(division: any = '', thana: any = '', bloodGroup: any = '', date: any = '', postBy: any = '', from: any = '', to: any = ''): Observable<any[]> {
    console.log(this.urlUser + `/SearchDonerReg?division=${division}&thana=${thana}&BloodGroup=${encodeURIComponent(bloodGroup)}&TodayOrBack3Month=${date}&postBy=${encodeURIComponent(postBy)}&from=${from}&to=${to ? to : from}`)
    return this.http.post<any[]>(this.urlUser + `/SearchDonerReg?division=${division}&thana=${thana}&BloodGroup=${encodeURIComponent(bloodGroup)}&TodayOrBack3Month=${date}`, {});
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
