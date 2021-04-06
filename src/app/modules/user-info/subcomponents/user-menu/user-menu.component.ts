import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';

export enum ETabMenu {
    companySettings = 0,
    userSettings = 1,
    options = 2,
    secureSettings = 3,
}

@Component({
    selector: 'user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
    @Output() changeTabIndexEmit = new EventEmitter<number>();

    constructor() {}

    ngOnInit(): void {}

    tabChange($event: NzTabChangeEvent) {
        this.changeTabIndexEmit.emit($event.index);
    }
}
