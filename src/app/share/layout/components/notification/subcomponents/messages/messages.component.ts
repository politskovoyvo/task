import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
