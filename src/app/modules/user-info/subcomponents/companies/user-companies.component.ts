import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CompanyCoreService } from '@core/services/company-core.service';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthService } from '@core/auth/services/auth.service';
import { CompanyDto } from '@core/models/company.dto';
import { switchMap } from 'rxjs/operators';
import { UserCoreService } from '@core/services/user-core.service';

@Component({
    selector: 'user-companies',
    templateUrl: './user-companies.component.html',
    styleUrls: ['./user-companies.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCompaniesComponent implements OnInit {
    companies$: Observable<CompanyDto[]>;
    refreshSubj$ = new ReplaySubject();

    constructor(
        private readonly _companyCoreService: CompanyCoreService,
        private readonly _authService: AuthService,
        private readonly _userService: UserCoreService
    ) {}

    ngOnInit(): void {
        this.refreshSubjInit();
        this.refreshSubj$.next();
    }

    refresh() {
        this.refreshSubj$.next();
    }

    private refreshSubjInit() {
        this.companies$ = this.refreshSubj$.pipe(
            switchMap(() => this._userService.getCompanies())
        );
    }
}
