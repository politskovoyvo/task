import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from '@modules/user-info/settings.component';
import { UserSettingsComponent } from '@modules/user-info/subcomponents/user-options/user-settings.component';
import { OptionsComponent } from '@modules/user-info/subcomponents/options/options.component';
import { SecureSettingsComponent } from '@modules/user-info/subcomponents/secure-options/secure-settings.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            {
                path: 'company-setting',
                loadChildren: () =>
                    import('./subcomponents/companies/company-settings.module').then(
                        (m) => m.CompanySettingsModule
                    ),
            },
            {
                path: 'user-setting',
                component: UserSettingsComponent,
            },
            {
                path: 'options',
                component: OptionsComponent,
            },
            {
                path: 'secure-settings',
                component: SecureSettingsComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
