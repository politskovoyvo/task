import { NgModule } from '@angular/core';
import { CompanySettingsService } from '@modules/user-info/subcomponents/companies/company-settings.service';
import { CompanySettingsComponent } from '@modules/user-info/subcomponents/companies/company-settings.component';
import { CompanySettingsRoutingModule } from '@modules/user-info/subcomponents/companies/company-settings-routing.module';
import { CompanyCardComponent } from '@modules/user-info/subcomponents/companies/company-card/company-card.component';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserCompaniesComponent } from './user-companies/user-companies.component';
import { CompanyAdminGuard } from '@modules/user-info/subcomponents/companies/admin/guard/company-admin.guard';
import { CompanyAdminComponent } from '@modules/user-info/subcomponents/companies/admin/company-admin.component';
import { EmployeesSettingsComponent } from './admin/subcomponents/employees-settings/employees-settings.component';

@NgModule({
    declarations: [
        CompanySettingsComponent,
        CompanyCardComponent,
        UserCompaniesComponent,
        CompanyAdminComponent,
        EmployeesSettingsComponent,
    ],
    imports: [
        CommonModule,
        CompanySettingsRoutingModule,
        NzDropDownModule,
        ReactiveFormsModule,
        NzInputModule,
        FormsModule,
        NzCheckboxModule,
        NzButtonModule,
    ],
    providers: [CompanySettingsService, CompanyAdminGuard],
})
export class CompanySettingsModule {}
