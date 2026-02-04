import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  private readonly API_KEY = 'a5e95177da353f58113fd60296e1d250';
  private readonly API_BASE_URL = 'https://api.flickr.com/services/rest/';

  constructor(private http: HttpClient) {
  }

  public getFlowers(page: number, colorCode?: number): Observable<any> {
    let params = new HttpParams()
      .set('method', 'flickr.photos.search')
      .set('text', 'flowers')
      .set('api_key', this.API_KEY)
      .set('format', 'json')
      .set('nojsoncallback', '1')
      .set('page', page)
      .set('per_page', 20);

    if (colorCode !== undefined) {
      params = params.set('color_codes', colorCode);
    }

    return this.http.get(this.API_BASE_URL, { params });
  }
}
