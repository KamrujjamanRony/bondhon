import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private jsonUrl = 'data/data.json';

  // Method to fetch JSON data
  getJsonData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  // Method to fetch and filter JSON data by parentId
  getCityByParentId(division: string): Observable<any[]> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(data => {
        // Access the districts array and filter it based on division
        const districts = data.districts || [];
        return districts.filter((item: any) => item.division == division);
      })
    );
  }
}
