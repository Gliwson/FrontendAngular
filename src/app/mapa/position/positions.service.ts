import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Point } from './modules/point';

@Injectable({
  providedIn: 'root',
})
export class PositionsService {
  readonly URL_DB = environment.config;

  constructor(private http: HttpClient) {}

  private getParams(param): HttpParams {
    return new HttpParams().set('point', param);
  }

  getPoint(param): Observable<Array<Point>> {
    return this.http.get<Array<Point>>(this.URL_DB, { params: this.getParams(param) });
  }
}
