import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'invites',
    templateUrl: './invites.component.html',
    styleUrls: ['./invites.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitesComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
