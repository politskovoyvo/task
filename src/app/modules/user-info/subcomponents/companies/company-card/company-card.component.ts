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

@UntilDestroy()
@Component({
    selector: 'company-card',
    templateUrl: './company-card.component.html',
    styleUrls: ['./company-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCardComponent implements OnInit {
    @Input() company: CompanyDto;
    @Output() selectEmit = new EventEmitter();
    @Input() isSelected = false;

    constructor(private readonly _companyService: CompanyCoreService) {}

    ngOnInit(): void {}

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
