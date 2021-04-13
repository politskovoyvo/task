import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Base } from '@share/models/base';
import { CompanyCoreService } from '@core/services/company-core.service';

@Component({
    selector: 'employees-settings',
    templateUrl: './employees-settings.component.html',
    styleUrls: ['./employees-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesSettingsComponent implements OnInit {
    @Input() companyId: number;

    employees$: Observable<Base[]>;

    constructor(private readonly _companyCoreService: CompanyCoreService) {}

    ngOnInit(): void {
        this.employees$ = this._companyCoreService.getUsersByCompanyId(this.companyId);
    }
}
