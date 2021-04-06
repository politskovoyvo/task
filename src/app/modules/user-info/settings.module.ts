import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from '@modules/user-info/settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { UserMenuComponent } from './subcomponents/user-menu/user-menu.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { UserSettingsComponent } from './subcomponents/user-options/user-settings.component';
import { OptionsComponent } from './subcomponents/options/options.component';
import { SecureSettingsComponent } from './subcomponents/secure-options/secure-settings.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
    declarations: [
        SettingsComponent,
        UserMenuComponent,
        UserSettingsComponent,
        OptionsComponent,
        SecureSettingsComponent,
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
    providers: [],
    exports: [],
})
export class SettingsModule {}
