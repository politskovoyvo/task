import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-options',
    templateUrl: './user-options.component.html',
    styleUrls: ['./user-options.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserOptionsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
