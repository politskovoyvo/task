import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TDropdownComponent } from './t-dropdown.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [TDropdownComponent],
  imports: [CommonModule, NzDropDownModule, NzIconModule],
  exports: [TDropdownComponent]
})
export class TDropdownModule {}
