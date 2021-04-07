import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanySettingsComponent } from '@modules/user-info/subcomponents/companies/company-settings.component';
import { CompanyAdminComponent } from '@modules/user-info/subcomponents/companies/admin/company-admin.component';
import { CompanyAdminGuard } from '@modules/user-info/subcomponents/companies/admin/guard/company-admin.guard';
import { UserCompaniesComponent } from '@modules/user-info/subcomponents/companies/user-companies/user-companies.component';

const routes: Routes = [
    {
        path: '',
        component: CompanySettingsComponent,
        children: [
            {
                path: '',
                component: UserCompaniesComponent,
            },
            {
                path: ':companyId',
                component: CompanyAdminComponent,
                canActivate: [CompanyAdminGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CompanySettingsRoutingModule {}
