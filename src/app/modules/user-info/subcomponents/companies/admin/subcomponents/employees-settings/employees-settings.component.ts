import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    TemplateRef,
} from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { Base } from '@share/models/base';
import { CompanyCoreService } from '@core/services/company-core.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { ModalService } from '@share/modules/modal';

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
    searchSubj$ = new BehaviorSubject<string>('');
    selectedUser: Base;
    refresh$ = new ReplaySubject();
    removeModalId = 'remove-modal';

    constructor(
        private readonly _companyCoreService: CompanyCoreService,
        private readonly _modalService: ModalService
    ) {}

    ngOnInit(): void {
        this.searchSubjInit();
        this.employeesCount$ = this.refresh$.pipe(
            switchMap(() =>
                this._companyCoreService.getUserCountByCompanyId(this.companyId)
            )
        );

        this.refresh$.next();
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

    removeUser() {
        const userId = this.selectedUser.id;
        if (!userId) {
            return;
        }

        this._companyCoreService
            .removeUserFromCompany({ userId, companyId: this.companyId, reason: '' })
            .pipe(
                untilDestroyed(this),
                tap(() => {
                    this.refresh();
                    this.closeRemoveModal();
                })
            )
            .subscribe();
    }

    refresh() {
        this.refresh$.next();
        this.searchSubj$.next(this.searchSubj$.value);
    }

    showRemoveModal(
        user: Base,
        template: TemplateRef<any>,
        footerTemplate: TemplateRef<any>
    ) {
        this.selectedUser = user;

        this._modalService.create({
            id: this.removeModalId,
            titleTemplate: template,
            content: null,
            footer: footerTemplate,
            width: '400px',
            height: '200px',
            isCloseIcon: true,
        });
    }

    closeRemoveModal() {
        this._modalService.close(this.removeModalId);
    }
}
