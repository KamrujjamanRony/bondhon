import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  http = inject(HttpClient);
  rootUrl = 'https://a.bandhanblood.com/api/Gallery';

  addGallery(model: any | FormData): Observable<void> {
    return this.http.post<void>(this.rootUrl, model)
  }

  getGallery(query: any): Observable<any> {
    return this.http.post<any>(`${this.rootUrl}/Search`, query);
  }

  updateGallery(id: any, updateGalleryRequest: any | FormData): Observable<any> {
    return this.http.put<any>(`${this.rootUrl}/Edit/${id}`, updateGalleryRequest);
  }

  deleteGallery(id: any): Observable<any> {
    return this.http.delete<any>(`${this.rootUrl}/Delete?id=${id}`);
  }
}
