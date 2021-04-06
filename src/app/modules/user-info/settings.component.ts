import { Component, OnInit } from '@angular/core';
import { ETabMenu } from '@modules/user-info/subcomponents/user-menu/user-menu.component';
import { Router } from '@angular/router';
import { ESettingsRoutes } from '@modules/user-info/settings.routes';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    constructor(private readonly _router: Router) {}

    ngOnInit(): void {}

    tabChange($event: number) {
        switch ($event) {
            case ETabMenu.companySettings:
                this._router.navigate([ESettingsRoutes.companySettings]).then();
                break;
            case ETabMenu.userSettings:
                this._router.navigate([ESettingsRoutes.userSettings]).then();
                break;
            case ETabMenu.options:
                this._router.navigate([ESettingsRoutes.options]).then();
                break;
            case ETabMenu.secureSettings:
                this._router.navigate([ESettingsRoutes.secureSettings]).then();
                break;
        }
    }
}
