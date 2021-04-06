import { Component, OnInit } from '@angular/core';
import { ETabMenu } from '@modules/user-info/subcomponents/user-menu/user-menu.component';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    menuTypeIndex = 0;
    menuTypes = ETabMenu;

    constructor() {}

    ngOnInit(): void {}

    tabChange($event: string) {
        this.menuTypeIndex = this.menuTypes[$event];
    }
}
