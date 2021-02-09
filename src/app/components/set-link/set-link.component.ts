import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-set-link',
    templateUrl: './set-link.component.html',
    styleUrls: ['./set-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetLinkComponent implements OnInit {
    @Input() taskId?: number;
    form?: FormGroup;

    linkTypes = [
        { id: 1, name: 'parent for' },
        { id: 2, name: 'child for' },
    ];

    constructor(private _fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.initForm();
    }

    initForm() {
        return this._fb.group({
            linkType: [this.linkTypes[0], [Validators.required]],
        });
    }
}
