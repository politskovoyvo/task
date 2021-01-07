import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from 'src/app/share/layout/components/header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, LayoutRoutingModule, NzIconModule, NzAvatarModule],
})
export class LayoutModule {}
