import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthCoreService } from './auth-core.service';
import { User } from '../models/user';
import { TokenInfo } from '../models/token-info';
import { SESSION_STORAGE_KEYS } from '../models/session-storage-key';
import { Permission } from '@core/auth/permission';

interface IPermissions {
    [companyId: string]: string[];
}

@UntilDestroy()
@Injectable()
export class AuthService {
    public permission: Permission;
    private _userSubject = new BehaviorSubject<User>({} as User);

    public get user(): User {
        return this._userSubject.getValue();
    }

    public set user(value: User) {
        this._userSubject.next(value);
    }

    constructor(
        private readonly _authCoreService: AuthCoreService,
        private readonly _activatedRoute: ActivatedRoute,
        private readonly _router: Router
    ) {
        this.permission = new Permission();
    }

    public auth(login: string, password: string) {
        return this._authCoreService.login(login, password).pipe(
            tap((tokenInfo: TokenInfo) => {
                this.updateLocalToken(tokenInfo);
                this._router.navigate(['']).then();
            })
        );
    }

    public refreshToken(): Observable<TokenInfo> {
        const refreshToken = localStorage.getItem(SESSION_STORAGE_KEYS.refreshToken);
        return this._authCoreService.refresh(refreshToken).pipe(
            catchError(() => this.redirectIfNeed()),
            tap((tokenInfo: TokenInfo) => {
                this.updateLocalToken(tokenInfo);
                if (this._router.url?.slice(0, 6) === '/login') {
                    this._router.navigate(['/']).then();
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
            return;
        }

        // Если мы не в руте, сохраняем редирект на текущую страницу.
        if (currentUrl && currentUrl !== '/') {
            this._router
                .navigate(['/', 'login'], {
                    queryParams: { redirectUrl: currentUrl },
                })
                .then();
            return;
        } else {
            // Если мы в руте, сохраняем редирект на рут.
            this._router.navigate(['/', 'login']).then();
            return;
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
            url.split('?')[1]
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

        this._userSubject.next({
            ...this.user,
            accessToken,
            id: decodeTokenInfo.id,
            name: decodeTokenInfo.name,
        });

        this.setPermissions(decodeTokenInfo.permissions);
        localStorage.setItem(SESSION_STORAGE_KEYS.refreshToken, refreshToken);
    }

    private setPermissions(permissionDto: string) {
        if (!permissionDto) {
            this.permission.set = null;
        }
        const decodePermissions: IPermissions =
            permissionDto
                .split('/')
                ?.filter((i) => !!i)
                ?.map((i) => i.split(':'))
                ?.filter((i) => i.length === 2)
                ?.map((i) => ({
                    [+i[0]]: i[1]
                        .split(',')
                        .filter((v) => !!v)
                        .map((v) => v.replace("'", '')),
                }))
                ?.reduce((acc, v) => ({ ...acc, ...v }), {}) || null;

        this.permission.set = decodePermissions;
    }

    private getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (error) {
            return null;
        }
    }
}
