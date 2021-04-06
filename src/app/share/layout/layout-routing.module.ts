import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { EUserInfoRoutes } from '@modules/user-info/settings-routing.module';
import { CompanyGuard } from '@share/guards/company.guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('../../modules/graph/graph.module').then((m) => m.GraphModule),
                // canActivate: [CompanyGuard],
            },
            {
                path: EUserInfoRoutes.global,
                loadChildren: () =>
                    import('@modules/user-info/settings.module').then(
                        (m) => m.SettingsModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
