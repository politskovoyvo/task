import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanySettingsComponent } from '@modules/user-info/subcomponents/companies/company-settings.component';

const routes: Routes = [
    {
        path: '',
        component: CompanySettingsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CompanySettingsRoutingModule {}
