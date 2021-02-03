import { AfterViewInit, Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, tap } from 'rxjs/operators';

@UntilDestroy()
@Directive({
    selector: 'form [isDirty]',
})
export class IsDirtyDirective implements AfterViewInit {
    @Input() formGroup: FormGroup;

    cash?;

    constructor() {}

    ngAfterViewInit(): void {
        setTimeout(() => this.setCash(), 0);
    }

    setCash() {
        this.cash = this.formGroup.getRawValue();

        for (const control in this.formGroup.controls) {
            this.formGroup
                .get(control)
                .valueChanges.pipe(
                    untilDestroyed(this),
                    tap((value) => {
                        if (
                            JSON.stringify(value) === JSON.stringify(this.cash[control])
                        ) {
                            this.formGroup.get(control).markAsPristine();
                        }
                        // console.log(this.formGroup.get(control).dirty);
                    })
                )
                .subscribe();
        }
    }
}
