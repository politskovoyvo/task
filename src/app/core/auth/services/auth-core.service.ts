import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TokenInfo } from '../models/token-info';

@Injectable()
export class AuthCoreService {
  private readonly URL: 'https://auth.com/api';
  BASE_KEY = 'Basic cG9ydGFsX2RycjpxaTY4ZTNIN3kxV2Q0ZllP';

  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<TokenInfo> {
    return of({
      refresh_token: '8d4d8643fb802998d49d868cf93028b732b47383285ba22af84d41fcedf0f255',
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoi0JLQu9Cw0LTQuNC80LjRgCIsImxhc3RfbmFtZSI6ItCf0L7Qu9C40YbQutC-0LLQvtC5IiwibWlkZGxlX25hbWUiOiLQntC70LXQs9C-0LLQuNGHIiwiaWF0IjoxNTE2MjM5MDIyfQ.yX9VbZR1XdYa1jX10qM8pIPZWPlizHTDH5AS9USixQQ',
      token_type: 'Bearer',
      expires_in: 900,
    } as TokenInfo);
    return this.http.post<TokenInfo>(`${this.URL}/connect/login=${login}&pass=${password}`, {
      headers: this.getHeader(this.BASE_KEY),
    });
  }

  refresh(refreshToken: string): Observable<TokenInfo> {
    return this.http.post<TokenInfo>(`${this.URL}/connect/refresh=${refreshToken}`, {
      headers: this.getHeader(this.BASE_KEY),
    });
  }

  private getHeader(key: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: key,
    });
  }
}
