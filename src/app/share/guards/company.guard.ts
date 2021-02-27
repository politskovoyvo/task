import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyCoreService } from '@core/services/company-core.service';
import { map } from 'rxjs/operators';
import { AuthService } from '@core/auth/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class CompanyGuard implements CanActivate {
    constructor(
        private readonly _companyService: CompanyCoreService,
        private readonly _authService: AuthService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this._companyService
            .getCompanies()
            .pipe(map((companies: []) => !!companies?.length));
    }
}
