import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { TokenInfo } from '../models/token-info';

@Injectable()
export class AuthCoreService {
    private readonly URL: 'https://auth.com/api';
    BASE_KEY = 'Basic cG9ydGFsX2RycjpxaTY4ZTNIN3kxV2Q0ZllP';

    constructor(private http: HttpClient) {}

    login(login: string, password: string): Observable<TokenInfo> {
        //TODO: заглушка пока нет бека
        if (login !== 'admin' || password !== 'admin') {
            return throwError('User credentials are invalid');
        }
        return of(this.getMockToken());

        return this.http.post<TokenInfo>(
            `${this.URL}/connect/login=${login}&pass=${password}`,
            {
                headers: this.getHeader(this.BASE_KEY),
            }
        );
    }

    refresh(refreshToken: string): Observable<TokenInfo> {
        return of(this.getMockToken());
        return this.http.post<TokenInfo>(`${this.URL}/connect/refresh=${refreshToken}`, {
            headers: this.getHeader(this.BASE_KEY),
        });
    }

    private getMockToken() {
        return {
            refresh_token:
                '8d4d8643fb802998d49d868cf93028b732b47383285ba22af84d41fcedf0f255',
            access_token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoi0JLQu9Cw0LTQuNC80LjRgCIsImxhc3RfbmFtZSI6ItCf0L7Qu9C40YbQutC-0LLQvtC5IiwibWlkZGxlX25hbWUiOiLQntC70LXQs9C-0LLQuNGHIiwicGVybWlzc2lvbnMiOiIvMTonb3duZXInLzI6J2VkaXRfY29tcGFueV9pbmZvLGludml0ZV91c2VyJy8zOicnIn0.GWOXMgZ1RuH9quz-G0Ow7UmKCfX6x4TP_CNajiRtEpk',
            token_type: 'Bearer',
            expires_in: 900,
        } as TokenInfo;
    }

    private getHeader(key: string): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: key,
        });
    }
}
