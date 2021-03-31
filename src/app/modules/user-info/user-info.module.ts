import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';
import { UserInfoRoutingModule } from '@modules/user-info/user-info-routing.module';
import { UserCompaniesComponent } from './subcomponents/companies/user-companies.component';
import { CompanyCardComponent } from './subcomponents/companies/company-card/company-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { UserMenuComponent } from './subcomponents/user-menu/user-menu.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { UserOptionsComponent } from './subcomponents/user-options/user-options.component';
import { OptionsComponent } from './subcomponents/options/options.component';
import { SecureOptionsComponent } from './subcomponents/secure-options/secure-options.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
    declarations: [
        UserInfoComponent,
        UserCompaniesComponent,
        CompanyCardComponent,
        UserMenuComponent,
        UserOptionsComponent,
        OptionsComponent,
        SecureOptionsComponent,
    ],
    imports: [
        CommonModule,
        UserInfoRoutingModule,
        FormsModule,
        NzCheckboxModule,
        NzTabsModule,
        NzPopoverModule,
        NzButtonModule,
        NzDropDownModule,
        NzInputModule,
        ReactiveFormsModule,
    ],
})
export class UserInfoModule {}
