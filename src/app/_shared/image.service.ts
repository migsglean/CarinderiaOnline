import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = "https://localhost:7003/api/image/add"

  constructor(private http: HttpClient) { }

  uploadImage(imageData: FormData) {
    return this.http.post(this.apiUrl, imageData)
  }
}
