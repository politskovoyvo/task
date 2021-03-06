import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';

export enum ETabMenu {
    companyOptions = 0,
    userOptions = 1,
    options = 2,
    secureOptions = 3,
}

@Component({
    selector: 'user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
    @Output() checkTabEmit = new EventEmitter<string>();

    constructor() {}

    ngOnInit(): void {}

    tabChange($event: NzTabChangeEvent) {
        this.checkTabEmit.emit(ETabMenu[$event.index]);
    }
}
