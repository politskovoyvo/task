import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
} from '@angular/core';
import { CompanyDto } from '@core/models/company.dto';
import { CompanyCoreService } from '@core/services/company-core.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';
import { AuthService } from '@core/auth/services/auth.service';
import { ModalService } from '@share/modules/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCoreService } from '@core/services/user-core.service';
import { CompanySettingsService } from '@modules/user-info/subcomponents/companies/company-settings.service';
import { Router } from '@angular/router';
import { ESettingsRoutes } from '@modules/user-info/settings.routes';

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
    isRemoveConfirm = false;
    removeForm: FormGroup;

    constructor(
        private readonly _companyService: CompanyCoreService,
        private readonly _userCoreService: UserCoreService,
        private readonly _authService: AuthService,
        private readonly _modalService: ModalService,
        private readonly _fb: FormBuilder,
        private readonly _companyOptionsService: CompanySettingsService,
        private readonly _router: Router
    ) {
        this.removeForm = this.InitRemoveForm();
    }

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

    removeCompany() {
        this._userCoreService
            .removeCompany(this.company.id, this.removeForm.get('reason').value)
            .pipe(
                untilDestroyed(this),
                tap(() => this._companyOptionsService.refresh())
            )
            .subscribe();

        this._modalService.close('removeCompany');
    }

    showRemoveModal(content: TemplateRef<any>, footer: TemplateRef<any>) {
        this._modalService.create({
            id: 'removeCompany',
            isCloseIcon: true,
            width: '400px',
            content,
            footer,
        });
    }

    showEditCompany() {
        this._router.navigate([ESettingsRoutes.companySettings, this.company.id]).then();
    }

    private InitRemoveForm(): FormGroup {
        const form = this._fb.group({
            companyName: ['', Validators.required],
            reason: ['', Validators.required],
        });

        form.valueChanges
            .pipe(
                untilDestroyed(this),
                tap((formRaws) => {
                    if (formRaws.companyName === this.company.name) {
                        this.isRemoveConfirm = true;
                        return;
                    }

                    this.isRemoveConfirm = false;
                })
            )
            .subscribe();

        return form;
    }
}
