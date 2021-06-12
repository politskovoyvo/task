import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NotificationService } from '@core/services/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        public readonly viewContainerRef: ViewContainerRef,
        private readonly _webSocketService: NotificationService
    ) {}

    ngOnInit(): void {
        this._webSocketService.setupSocketConnection();
    }
}
