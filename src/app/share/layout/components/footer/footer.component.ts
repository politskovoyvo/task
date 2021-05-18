import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnInit,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
    @Output() isNotificationEmit = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    showNotifications() {
        this.isNotificationEmit.emit();
    }
}
