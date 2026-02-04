import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  private readonly API_KEY = 'a5e95177da353f58113fd60296e1d250';
  private readonly API_BASE_URL = 'https://api.flickr.com/services/rest/';

  constructor(private http: HttpClient) {}

}
