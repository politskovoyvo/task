import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, filter, flatMap, map, switchMap, tap, timeout } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthCoreService } from './auth-core.service';
import { User } from '../models/user';
import { TokenInfo } from '../models/token-info';
import { SESSION_STORAGE_KEYS } from '../models/session-storage-key';
import { CookieService } from 'ngx-cookie-service';

@UntilDestroy()
@Injectable()
export class AuthService {
  private _userSubject = new BehaviorSubject<User>({});

  public get userObservable(): Observable<User> {
    return this._userSubject.asObservable();
  }

  public get user(): User {
    return this._userSubject.getValue();
  }

  public set user(value: User) {
    this._userSubject.next(value);
  }

  constructor(
    private _authCoreService: AuthCoreService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient,
    private _cookieService: CookieService
  ) {}

  public auth(login: string, password: string) {
    
    return this._authCoreService.login(login, password)
      .pipe(
        tap((tokenInfo: TokenInfo) => {
          this.updateLocalToken(tokenInfo);
        })
      );
  }

  public refreshToken(): Observable<TokenInfo> {
    const refreshToken = localStorage.getItem(SESSION_STORAGE_KEYS.refreshToken);
    return this._authCoreService.refresh(refreshToken)
      .pipe(
        catchError(err => this.redirectIfNeed()),
        tap((tokenInfo: TokenInfo) => {
          this.updateLocalToken(tokenInfo);
          if (this._router.url?.slice(0, 6) === '/login') {
            this._router.navigate(['/']);
          }
        })
      );
  }

  public logout(currentUrl?: string): Observable<boolean> {
    this.clearSession();
    // Урл на котором находимся сейчас
    if (!currentUrl) {
      currentUrl = this._router.url;
    }

    // Если мы уже находимся на странице логина, никуда не редиректим
    if (currentUrl.slice(0, 6) === '/login') {
      return of();
    }

    // Если мы не в руте, сохраняем редирект на текущую страницу.
    if (currentUrl && currentUrl !== '/') {
      this._router.navigate(['/', 'login'], { queryParams: { redirectUrl: currentUrl } });
      return of();
    } else {
      // Если мы в руте, сохраняем редирект на рут.
      this._router.navigate(['/', 'login']);
      return of();
    }
  }

  private redirectIfNeed() {
    const url = this._activatedRoute.snapshot.queryParamMap.get('redirectUrl');
    if (url) {
      // Получаем путь
      const redirectUrl = url.split('?')[0];

      if (!url.split('?')[1]) {
        return this._router.navigate([redirectUrl]);
      }

      const params = {};
      // Получаем строку с параметрами
      url
        .split('?')[1]
        // Преобразуем строку в массив из строк с параметрами
        .split('&')
        // Берем ключи и значения и заполняем пустой объект
        .map((elem) => {
          params[elem.split('=')[0]] = elem.split('=')[1];
        });
      return this._router.navigate([redirectUrl], { queryParams: params });
    } else {
      return this._router.navigate(['']);
    }
  }

  private clearSession() {
    localStorage.removeItem(SESSION_STORAGE_KEYS.refreshToken);
    this._userSubject.next({} as User);
  }

  private updateLocalToken(tokenInfo: TokenInfo) {
    const accessToken = tokenInfo.access_token;
    const refreshToken = tokenInfo.refresh_token;
    const decodeTokenInfo = this.getDecodedAccessToken(accessToken);
    this.user.accessToken = accessToken;
    this.user.refreshToken = refreshToken;


    localStorage.setItem(SESSION_STORAGE_KEYS.refreshToken, refreshToken);
    this._cookieService.set(
      'Authorization',
      `Bearer ${tokenInfo.access_token}`,
      null,
      '/',
      '.wildberries.ru',
      true,
      'None'
    );
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }
}
