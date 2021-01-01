import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenInfo } from '../models/token-info';

type TODO_AUTH_RESPONSE = any;

@Injectable()
export class AuthCoreService {
  BASE_KEY = 'Basic cG9ydGFsX2RycjpxaTY4ZTNIN3kxV2Q0ZllP';
  private readonly URL: 'https://auth.com/api';

  constructor(private _http: HttpClient) {}

  login = (login: string, password: string): Observable<TODO_AUTH_RESPONSE> =>
    this._http.post<TODO_AUTH_RESPONSE>(`${this.URL}/connect/login=${login}&pass=${password}`, {
      headers: this.getHeader(this.BASE_KEY),
    });

  refresh = (refreshToken: string): Observable<TokenInfo> =>
    this._http.post<TokenInfo>(`${this.URL}/connect/refresh=${refreshToken}`, {
      headers: this.getHeader(this.BASE_KEY),
    });

  private getHeader = (key: string): HttpHeaders =>
    new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: key,
    });
}
