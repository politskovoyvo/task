import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Base } from '@share/models/base';
import { CompanyCoreService } from '@core/services/company-core.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, debounceTime, filter, switchMap } from 'rxjs/operators';

@UntilDestroy()
@Component({
    selector: 'employees-settings',
    templateUrl: './employees-settings.component.html',
    styleUrls: ['./employees-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesSettingsComponent implements OnInit {
    @Input() companyId: number;

    employees$ = new BehaviorSubject<Base[]>([]);
    employeesCount$: Observable<number>;
    searchSubj$ = new Subject<string>();

    constructor(private readonly _companyCoreService: CompanyCoreService) {}

    ngOnInit(): void {
        this.searchSubjInit();
        this.employeesCount$ = this._companyCoreService.getUserCountByCompanyId(
            this.companyId
        );
        // this.employees$ = this._companyCoreService.getUsersByCompanyId(this.companyId);
    }

    searchUsers($event: any) {
        this.searchSubj$.next($event.target.value);
    }

    private searchSubjInit() {
        this.searchSubj$
            .pipe(
                untilDestroyed(this),
                debounceTime(400),
                filter((query) => {
                    if (!query) {
                        this.employees$.next(null);
                        return false;
                    }
                    return true;
                }),
                switchMap((query) =>
                    this._companyCoreService.searchUsers(query, this.companyId)
                ),
                catchError((err) => {
                    return of();
                })
            )
            .subscribe(this.employees$);
    }
}
