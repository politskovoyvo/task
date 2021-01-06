import { Injectable } from '@angular/core';
import {
  HttpClient,
    HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, of, Subject, Subscriber } from 'rxjs';
import { catchError, finalize, retry, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TokenInfo } from './models/token-info';
import { SESSION_STORAGE_KEYS } from './models/session-storage-key';

type CallerRequest = {
  subscriber: Subscriber<any>;
  failedRequest: HttpRequest<any>;
};

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  request: CallerRequest[] = [];
  tokenRefreshedSource$ = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource$.asObservable();

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any> | any> {
    return this._sendRequest(next, request);
  }

  private _sendRequest(next, request): Observable<any> {
    const observable = new Observable<HttpEvent<any>>(
      (subscriber) => {
        const originalRequestSubscription = next
          .handle(this.addHeadersToRequest(request))
          .subscribe(
            (response) => {
              subscriber.next(response);
            },
            (err: HttpErrorResponse) => {
              if (err.status === 401) {
                this.handle401Error(subscriber, request);
              } else {
                this.logError(err, request.url);
              }
              subscriber.error(err);
            },
            () => {
              subscriber.complete();
            }
          );
        return () => {
          originalRequestSubscription?.unsubscribe();
        };
      }
    );
    return observable;
  }

  private handle401Error(
    subscriber: Subscriber<any>,
    request: HttpRequest<any>
  ) {
    this.request.push({ subscriber, failedRequest: request });
    return this.refreshToken()
      .pipe(
        tap((tokenInfo: TokenInfo) => {
          if (!this.authService.user) {
            this.logoutAndThrowError();
          }
          this.repeatFailedRequests(tokenInfo.access_token);
        })
      )
      .subscribe();
  }

  private repeatFailedRequests(authHeader) {
    this.request.forEach((c) => {
      this.repeatRequest(
        this.addHeadersToRequest(c.failedRequest),
        c.subscriber
      );
    });
    this.request = [];
  }

  private repeatRequest(
    requestWithNewToken: HttpRequest<any>,
    subscriber: Subscriber<any>
  ) {
    this.http
      .request(requestWithNewToken)
      .pipe(
        tap((res) => subscriber.next(res)),
        finalize(() => subscriber.complete()),
        catchError((err) => {
          if (err.status === 401) {
            this.authService.logout();
            return of();
          }
        })
      )
      .subscribe();
  }

  private refreshToken(): Observable<any> {
    if (this.isRefreshingToken) {
      return new Observable((observer) => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    }
    this.isRefreshingToken = true;
    return this.authService.refreshToken().pipe(
      retry(2),
      catchError((err) => {
        return this.logoutAndThrowError();
      }),
      tap((token) => {
        this.isRefreshingToken = false;
        this.tokenRefreshedSource$.next();
      })
    );
  }

  private logError(err, url) {
    if (err.status <= 0) {
      console.error('ошибка с сервером');
      return err;
    }

    let msg = '';
    msg += err.error ? err.error : '';
    msg += err.message ? err.message : '';

    if (!msg.length) {
      msg = `Произошла ошибка при выполнении запроса.
      ${url}`;
    }
    return err;
  }

  private addHeadersToRequest(
    request: HttpRequest<any>
  ): HttpRequest<any> {
    const headers: { [name: string]: string | string[] } = {};
    const token = this.authService.user.accessToken;
    if (token && !request.url.includes('token')) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return request.clone({ setHeaders: headers });
  }

  private logoutAndThrowError() {
    this.tokenRefreshedSource$.unsubscribe();
    this.isRefreshingToken = false;
    this.authService.logout();
    return of();
  }
}
