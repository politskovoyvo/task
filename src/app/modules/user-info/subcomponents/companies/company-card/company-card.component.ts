import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { CompanyDto } from '@core/models/company.dto';
import { CompanyCoreService } from '@core/services/company-core.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';
import { AuthService } from '@core/auth/services/auth.service';

@UntilDestroy()
@Component({
    selector: 'company-card',
    templateUrl: './company-card.component.html',
    styleUrls: ['./company-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCardComponent implements OnInit {
    @Input() company: CompanyDto = {} as CompanyDto;
    @Input() isSelected = false;
    @Output() selectEmit = new EventEmitter();

    isEditCompanyInfo = false;

    constructor(
        private readonly _companyService: CompanyCoreService,
        private readonly _authService: AuthService
    ) {}

    ngOnInit(): void {
        this.isEditCompanyInfo = this._authService.permission.isEditCompanyInfo(
            this.company.id
        );
    }

    editCompany() {
        this._companyService
            .setCompany(this.company.id)
            .pipe(
                untilDestroyed(this),
                tap(() => this.selectEmit.emit())
            )
            .subscribe();
    }
}
