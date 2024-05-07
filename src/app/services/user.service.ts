import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/user.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers = (): Observable<User[]> =>
    this.http.get<User[]>(environment.endpoints.users);

  getUserById = (id: number): Observable<User> =>
    this.http.get<User>(`${environment.endpoints.users}/${id}`);
}
