import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '@app/models/album.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AlbumService {
  constructor(private http: HttpClient) {}

  getAllAlbums = (): Observable<Album[]> =>
    this.http.get<Album[]>(environment.endpoints.albums);

  getAlbumById = (id: number): Observable<Album> =>
    this.http.get<Album>(`${environment.endpoints.albums}/${id}`);
}
