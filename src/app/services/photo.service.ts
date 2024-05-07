import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '@app/models/photo.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class PhotoService {
  constructor(private http: HttpClient) {}

  getAllPhotos = (): Observable<Photo[]> =>
    this.http.get<Photo[]>(environment.endpoints.photos);

  getPhotoById = (id: number): Observable<Photo> =>
    this.http.get<Photo>(`${environment.endpoints.photos}/${id}`);
}
