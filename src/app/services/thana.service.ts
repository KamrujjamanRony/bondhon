import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThanaService {

  http = inject(HttpClient);
  rootUrl = 'https://a.bandhanblood.com/api/Thana';

  addThana(model: any | FormData): Observable<void> {
    return this.http.post<void>(this.rootUrl, model)
  }

  getThana(query: any): Observable<any> {
    return this.http.post<any>(`${this.rootUrl}/Search`, query);
  }

  updateThana(id: any, updateThanaRequest: any | FormData): Observable<any> {
    return this.http.put<any>(`${this.rootUrl}/Edit/${id}`, updateThanaRequest);
  }

  deleteThana(id: any): Observable<any> {
    return this.http.delete<any>(`${this.rootUrl}/Delete?id=${id}`);
  }
}
