import { Component, Input, OnInit } from '@angular/core';
import { CompanyCoreService } from '@core/services/company-core.service';
import { Observable } from 'rxjs';
import { Base } from '@share/models/base';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
    selector: 'user-companies',
    templateUrl: './user-companies.component.html',
    styleUrls: ['./user-companies.component.scss'],
})
export class UserCompaniesComponent implements OnInit {
    companies$: Observable<Base[]>;

    constructor(
        private readonly _companyCoreService: CompanyCoreService,
        private readonly _authService: AuthService
    ) {}

    ngOnInit(): void {
        this.companies$ = this._companyCoreService.getCompanies();
    }
}
