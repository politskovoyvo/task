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

@NgModule({
    declarations: [CompanySettingsComponent, CompanyCardComponent],
    imports: [
        CommonModule,
        CompanySettingsRoutingModule,
        NzDropDownModule,
        ReactiveFormsModule,
        NzInputModule,
        FormsModule,
        NzCheckboxModule,
    ],
    providers: [CompanySettingsService],
})
export class CompanySettingsModule {}
