import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'secure-options',
    templateUrl: './secure-settings.component.html',
    styleUrls: ['./secure-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecureSettingsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
