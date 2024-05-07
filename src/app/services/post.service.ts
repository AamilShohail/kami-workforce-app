import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '@app/models/posts.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts = (): Observable<Post[]> =>
    this.http.get<Post[]>(environment.endpoints.posts);

  getPostById = (id: number): Observable<Post> =>
    this.http.get<Post>(`${environment.endpoints.posts}/${id}`);
}
