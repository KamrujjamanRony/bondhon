import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlUser = 'http://localhost:1001/api/DonerReg';

  http = inject(HttpClient);

  addUser(model: any | FormData): Observable<void> {
    return this.http.post<void>(this.urlUser, model)
  }

  getUser(division: any = '', thana: any = '', bloodGroup: any = '', todayOrBack3Month: any = '', postBy: any = '', from: any = '', to: any = '', search: any = '', isAgree: any = ''): Observable<any[]> {
    const query = {
      "search": search,
      "fromDate": from,
      "toDate": to,
      "division": division,
      "thana": thana,
      "bloodGroup": bloodGroup,
      "todayOrBack3Month": todayOrBack3Month,
      "isAgree": isAgree,
      "postedBy": postBy
    };
    return this.http.post<any[]>(this.urlUser + `/Search`, query);
  }

  updateUser(id: any, updateUserRequest: any | FormData): Observable<any> {
    return this.http.put<any>(this.urlUser + `/Edit/${id}`, updateUserRequest);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.post<any>(this.urlUser + `/Delete?id=${id}`, {});
  }
}
