import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { WebsocketService } from '@core/services/transportation/websocket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        public readonly viewContainerRef: ViewContainerRef,
        private readonly _webSocketService: WebsocketService
    ) {}

    ngOnInit(): void {
        this._webSocketService.setupSocketConnection();
    }
}
