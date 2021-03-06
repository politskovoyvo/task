import { Component, OnInit } from '@angular/core';
import { ETabMenu } from '@modules/user-info/subcomponents/user-menu/user-menu.component';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
    menuTypeIndex = 0;
    menuTypes = ETabMenu;

    constructor() {}

    ngOnInit(): void {}

    tabChange($event: string) {
        this.menuTypeIndex = this.menuTypes[$event];
    }
}
