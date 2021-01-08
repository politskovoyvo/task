import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TSelectComponent } from './t-select.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TSelectComponent],
  imports: [CommonModule, NzSelectModule, FormsModule],
  exports: [TSelectComponent],
})
export class TSelectModule {}
