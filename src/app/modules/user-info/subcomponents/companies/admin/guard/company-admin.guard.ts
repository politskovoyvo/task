import {
    ActivatedRouteSnapshot,
    CanActivate,
    Resolve,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { ESettingsRoutes } from '@modules/user-info/settings.routes';

@Injectable()
export class CompanyAdminGuard implements CanActivate {
    constructor(
        private readonly _authService: AuthService,
        private readonly _router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const companyId = route.params.companyId;

        if (this._authService.permission.isEditCompanyInfo(companyId)) {
            return true;
        }

        this._router.navigate([ESettingsRoutes.companySettings]).then(() => false);
    }
}
