import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'company-admin',
    templateUrl: './company-admin.component.html',
    styleUrls: ['./company-admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyAdminComponent implements OnInit {
    companyId: number;

    constructor(private readonly _activateRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this._activateRoute.params
            .pipe(
                untilDestroyed(this),
                tap((params) => {
                    this.companyId = params.companyId;
                })
            )
            .subscribe();
    }
}
