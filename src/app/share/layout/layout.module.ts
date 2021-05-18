import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from 'src/app/share/layout/components/header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { FooterComponent } from './components/footer/footer.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NotificationComponent } from './components/notification/notification.component';
import { HeaderService } from '@share/layout/components/header/header.service';
import { MessagesComponent } from './components/notification/subcomponents/messages/messages.component';
import { InvitesComponent } from './components/notification/subcomponents/invites/invites.component';

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        NotificationComponent,
        MessagesComponent,
        InvitesComponent,
    ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        NzIconModule,
        NzAvatarModule,
        NzPopoverModule,
    ],
    providers: [HeaderService],
})
export class LayoutModule {}
