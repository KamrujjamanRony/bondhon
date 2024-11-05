import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  http = inject(HttpClient);

  addGallery(model: any | FormData): Observable<void>{
    return this.http.post<void>('http://localhost:3000/gallery', model)
  }

  getAllGallery(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/gallery');
  }

  getGallery(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/gallery?id=${id}`);
  }

  updateGallery(id: any, updateGalleryRequest: any | FormData): Observable<any>{
    return this.http.put<any>(`http://localhost:3000/gallery/${id}`, updateGalleryRequest);
  }

  deleteGallery(id: any): Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/gallery/${id}`);
  }
}
