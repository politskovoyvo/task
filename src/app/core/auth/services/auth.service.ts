import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, filter, flatMap, map, switchMap, tap, timeout } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthCoreService } from './core/auth-core.service';
import { User } from './models/user';
import { TokenInfo } from './models/token-info';

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
    private _http: HttpClient
  ) {}

  public auth(login: string, password: string) {
    return this._authCoreService.login
      .post(
        `${environment.urls.identityServerUrl}/connect/token`,
        `grant_type=password&username=${login}&password=${password}&scope=offline_access api1`,
        {
          headers: this.getHeader(loginPosition),
        }
      )
      .pipe(
        tap((tokenInfo: TokenInfo) => {
          this.updateLocalToken(tokenInfo);
          localStorage.setItem('loginPosition', loginPosition.toString());
        })
      );
  }

  public refreshToken(): Observable<TokenInfo> {
    const refreshToken = localStorage.getItem(SESSION_STORAGE_KEYS.refreshToken);
    return this._http
      .post<TokenInfo>(
        `${environment.urls.identityServerUrl}/connect/token`,
        `refresh_token=${refreshToken}&grant_type=refresh_token`,
        {
          headers: this.getHeader(+localStorage.getItem('loginPosition')),
        }
      )
      .pipe(
        tap((tokenInfo: TokenInfo) => {
          this.updateLocalToken(tokenInfo);
          if (this._router.url?.slice(0, 6) === '/login') {
            this._router.navigate(['/']);
          }
        })
      );
  }

  // /STOP/ ... New AUTH ... /STOP/

  public removeCookie() {
    return this._http.get(`${environment.urls.identityServerUrl}/profile/logout`, { withCredentials: true });
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

  public getTokenRequest(tokenData, isCourier?: boolean) {
    // Если телефон с кеша пропал, проверяем запрос
    if (tokenData.includes('refresh_token=undefined')) {
      isCourier = true;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: isCourier
        ? 'Basic cGFzc3BvcnRfYXV0aDo2bkFaOVVyNnJweDI4RW0='
        : 'Basic b3JyX2FkbWluOko5M0UxYmxEOVRpbw==',
    });
    return this._http
      .post(
        `${environment.urls.identityServerUrl}/connect/token`,
        isCourier
          ? `grant_type=password&username=passport&password=2UfEQ59o0S4BTyQ&scope=api_permission%20openid%20userInfo%20api1`
          : `${tokenData}&scope=${encodeURIComponent(environment.tokenScopes)}`,
        {
          withCredentials: true,
          headers,
        }
      )
      .pipe(timeout(2000));
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
    const permissions = {
      regions: [],
      position_id: +decodeTokenInfo.position_id,
      do_permissions: decodeTokenInfo.permissions?.split(','),
    };
    this.user.access_token = accessToken;
    this.user.refresh_token = refreshToken;
    this.user.employee_id = +decodeTokenInfo.id;
    this.user.family_name = decodeTokenInfo.name;
    this.user.position_name = decodeTokenInfo.position_name;
    this.user.isSuperUser = !!decodeTokenInfo.su;

    this._epSubject.next(new EPermissions(permissions));

    localStorage.setItem(SESSION_STORAGE_KEYS.refreshToken, refreshToken);
    localStorage.setItem(SESSION_STORAGE_KEYS.employee_id, this.user.employee_id?.toString());
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
