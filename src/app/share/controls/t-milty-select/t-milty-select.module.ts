import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TMiltySelectComponent } from './t-milty-select.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { TInputModule } from '../t-input/t-input.module';

@NgModule({
  declarations: [TMiltySelectComponent],
  imports: [CommonModule, NzSelectModule, FormsModule, TInputModule],
  exports: [TMiltySelectComponent],
})
export class TMiltySelectModule { }
