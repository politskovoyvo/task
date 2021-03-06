import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NzSelectModule,
        NzIconModule,
        NzDropDownModule,
        NzUploadModule,
        NzDatePickerModule,
        NzButtonModule,
        NzPopoverModule,
        NzEmptyModule,
        NzCheckboxModule,
    ],
    exports: [
        CommonModule,
        NzSelectModule,
        NzIconModule,
        NzDropDownModule,
        NzUploadModule,
        NzDatePickerModule,
        NzButtonModule,
        NzPopoverModule,
        NzEmptyModule,
        NzCheckboxModule,
    ],
    providers: [
        {
            provide: NZ_I18N,
            useValue: en_US,
        },
    ],
})
export class AntDesingModule {}
