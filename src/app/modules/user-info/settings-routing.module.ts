import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from '@modules/user-info/settings.component';
import { UserCompaniesComponent } from '@modules/user-info/subcomponents/companies/user-companies.component';

export enum EUserInfoRoutes {
    global = 'user-info',
}

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [{ path: 'company', component: UserCompaniesComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
