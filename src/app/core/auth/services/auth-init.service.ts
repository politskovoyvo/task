import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { SESSION_STORAGE_KEYS } from '../models/session-storage-key';
import { BoardCoreService } from '@core/services/board-core.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AppInit {
    constructor(private injector: Injector, private router: Router) {}

    public load(): Promise<any> {
        const auth = this.injector.get(AuthService);
        const boardCoreInit = this.injector.get(BoardCoreService);
        auth.user.refreshToken = localStorage.getItem(SESSION_STORAGE_KEYS.refreshToken);
        return auth
            .refreshToken()
            .pipe(switchMap(() => boardCoreInit.initBoards()))
            .toPromise()
            .then(() => true)
            .catch(() => {
                auth.logout(this.router.url);
                return true;
            });
    }
}
