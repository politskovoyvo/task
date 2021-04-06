import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-options',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
