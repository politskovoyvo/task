import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-companies',
    templateUrl: './company-settings.component.html',
    styleUrls: ['./company-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanySettingsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
