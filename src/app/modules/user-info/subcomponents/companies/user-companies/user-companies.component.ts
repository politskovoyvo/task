import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CompanyDto } from '@core/models/company.dto';
import { CompanyCoreService } from '@core/services/company-core.service';
import { AuthService } from '@core/auth/services/auth.service';
import { UserCoreService } from '@core/services/user-core.service';
import { CompanySettingsService } from '@modules/user-info/subcomponents/companies/company-settings.service';

@Component({
    selector: 'app-user-companies',
    templateUrl: './user-companies.component.html',
    styleUrls: ['./user-companies.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCompaniesComponent implements OnInit {
    companies$: Observable<CompanyDto[]>;
    refreshSubj$: Observable<any>;

    constructor(
        private readonly _companyCoreService: CompanyCoreService,
        private readonly _authService: AuthService,
        private readonly _userService: UserCoreService,
        private readonly _companyOptionsService: CompanySettingsService
    ) {
        this.refreshSubj$ = this._companyOptionsService.getRefreshSubject$();
    }

    ngOnInit(): void {
        this.refreshSubjInit();
        this.refresh();
    }

    refresh() {
        this._companyOptionsService.refresh();
    }

    private refreshSubjInit() {
        this.companies$ = this.refreshSubj$.pipe(
            switchMap(() => this._userService.getCompanies())
        );
    }
}
