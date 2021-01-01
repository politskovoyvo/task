import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [LayoutComponent, HeaderComponent],
  imports: [CommonModule, LayoutRoutingModule, NzIconModule],
})
export class LayoutModule {}
