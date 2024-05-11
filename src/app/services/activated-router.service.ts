import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivatedRouterService {
  constructor(private activatedRoute: ActivatedRoute) {}

  getActivatedId(): Observable<number> {
    return this.activatedRoute.paramMap.pipe(
      take(1),
      map((params: ParamMap) => {
        return Number(params.get('userId'));
      })
    );
  }
}
