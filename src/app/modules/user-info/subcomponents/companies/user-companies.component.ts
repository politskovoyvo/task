import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CompanyCoreService } from '@core/services/company-core.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { AuthService } from '@core/auth/services/auth.service';
import { CompanyDto } from '@core/models/company.dto';
import { switchMap } from 'rxjs/operators';

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
        private readonly _authService: AuthService
    ) {}

    ngOnInit(): void {
        // this.companies$ = this._companyCoreService.getCompanies();
        this.refreshSubjInit();
        this.refreshSubj$.next();
    }

    refresh() {
        console.log('dsdsdsdsd');
        this.refreshSubj$.next();
    }

    private refreshSubjInit() {
        this.companies$ = this.refreshSubj$.pipe(
            switchMap(() => this._companyCoreService.getCompanies())
        );
    }
}
