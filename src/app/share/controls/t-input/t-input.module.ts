import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TInputComponent } from './t-input.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TInputComponent],
  imports: [CommonModule, NzInputModule, FormsModule],
  exports: [TInputComponent],
})
export class TInputModule {}
