import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Base } from '@share/models/base';

@Component({
    selector: 'company-card',
    templateUrl: './company-card.component.html',
    styleUrls: ['./company-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCardComponent implements OnInit {
    @Input() company: Base;

    constructor() {}

    ngOnInit(): void {}
}
