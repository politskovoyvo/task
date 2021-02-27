import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';
import { UserInfoRoutingModule } from '@modules/user-info/user-info-routing.module';
import { UserCompaniesComponent } from './subcomponents/companies/user-companies.component';
import { CompanyCardComponent } from './subcomponents/companies/company-card/company-card.component';

@NgModule({
    declarations: [UserInfoComponent, UserCompaniesComponent, CompanyCardComponent],
    imports: [CommonModule, UserInfoRoutingModule],
})
export class UserInfoModule {}
