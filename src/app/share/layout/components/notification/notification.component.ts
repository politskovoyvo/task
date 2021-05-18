import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

export type NotificationType = 'message' | 'invite';

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
    @Input() isShow = false;
    selectedNotificationType: NotificationType = 'message';

    constructor() {}

    ngOnInit(): void {}

    changeNotificationType(type: NotificationType) {
        this.selectedNotificationType = type;
    }
}
