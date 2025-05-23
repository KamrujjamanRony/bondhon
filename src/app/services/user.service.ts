import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlUser = 'https://a.bandhanblood.com/api/DonerReg';

  http = inject(HttpClient);

  addUser(model: any): Observable<void> {
    return this.http.post<void>(this.urlUser + '/CreateDonerReg', model)
  }

  getOTP(model: any): Observable<string> {
    return this.http.post<string>(this.urlUser + '/GetOTP', model, { responseType: 'text' as 'json' });
  }


  tokenVerify(model: any): Observable<void> {
    return this.http.post<void>(this.urlUser + '/TokenVerify', model, { responseType: 'text' as 'json' });
  }

  loginUser(model: any): Observable<void> {
    return this.http.post<void>(this.urlUser + '/userlogin', model)
  }

  getUser(division: any = '', district: any = '', thana: any = '', bloodGroup: any = '', todayOrBack3Month: any = '', postBy: any = '', from: any = '', to: any = '', search: any = '', isAgree: any = ''): Observable<any[]> {
    const query = {
      "search": decodeURIComponent(search),
      "fromDate": from,
      "toDate": to,
      "division": decodeURIComponent(division),
      "district": decodeURIComponent(district),
      "thana": decodeURIComponent(thana),
      "bloodGroup": bloodGroup,
      "todayOrBack3Month": todayOrBack3Month,
      "isAgree": isAgree,
      "postedBy": decodeURIComponent(postBy)
    };
    return this.http.post<any[]>(this.urlUser + `/Search`, query);
  }

  updateUser(id: any, updateUserRequest: any): Observable<any> {
    return this.http.put<any>(this.urlUser + `/Edit/${id}`, updateUserRequest);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete<any>(this.urlUser + `/Delete?id=${id}`);
  }
}
