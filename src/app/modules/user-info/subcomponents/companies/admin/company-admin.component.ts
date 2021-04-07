import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'company-admin',
    templateUrl: './company-admin.component.html',
    styleUrls: ['./company-admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyAdminComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
