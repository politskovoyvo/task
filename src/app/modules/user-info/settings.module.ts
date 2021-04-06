import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from '@modules/user-info/settings-routing.module';
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
import { CompanyOptionsService } from '@modules/user-info/subcomponents/companies/company-options.service';

@NgModule({
    declarations: [
        SettingsComponent,
        UserCompaniesComponent,
        CompanyCardComponent,
        UserMenuComponent,
        UserOptionsComponent,
        OptionsComponent,
        SecureOptionsComponent,
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        FormsModule,
        NzCheckboxModule,
        NzTabsModule,
        NzPopoverModule,
        NzButtonModule,
        NzDropDownModule,
        NzInputModule,
        ReactiveFormsModule,
    ],
    providers: [CompanyOptionsService],
})
export class SettingsModule {}
