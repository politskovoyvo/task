import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from '@modules/user-info/user-info.component';

export enum EUserInfoRoutes {
    global = 'user-info',
}

const routes: Routes = [
    {
        path: '',
        component: UserInfoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserInfoRoutingModule {}
