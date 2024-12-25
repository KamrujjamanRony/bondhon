import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) {}
  rootUrl = 'https://mec.supersoftbd.com/apiA/AboutUs';
  companyCode = '4';

  
  getAllAbout(): Observable<any[]> {
    return this.http.get<any[]>(this.rootUrl);
  }

  getAbout(id: string): Observable<any>{
    return this.http.get<any>(`${this.rootUrl}/GetAboutUsById?id=${id}`);
  }

  updateAbout(id: string, updateAboutRequest: any | FormData): Observable<any>{
    return this.http.put<any>(`${this.rootUrl}/EditAboutUs/${id}`, updateAboutRequest);
  }
}
