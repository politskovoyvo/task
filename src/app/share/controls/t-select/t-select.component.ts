import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Base } from '@share/models/base';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 't-select',
    templateUrl: './t-select.component.html',
    styleUrls: ['./t-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TSelectComponent),
            multi: true,
        },
    ],
})
export class TSelectComponent implements OnInit, ControlValueAccessor {
    @Input() value: any;
    @Input() width = '100px';
    @Input() isMulti = false;
    @Input() isDisable = false;
    @Input() itemTemplate: TemplateRef<any>;
    @Input() type: 't-default' | 't-search' = 't-default';

    @Input() set items(items: []) {
        this._options = items;
    }

    _options: Base[];

    @Output() changeEmit = new EventEmitter();

    constructor(private _changeDetRef: ChangeDetectorRef) {}

    ngOnInit(): void {}

    onChange: any = () => {};

    change() {
        this.changeEmit.emit(this.value);
    }

    onTouched: any = () => {};

    openChange($event) {}

    writeValue(obj: any): void {
        if (!obj) {
            return;
        }

        this.value = this._options?.find((i: any) => obj.id === i.id);
        this.onChange(this.value);
        this.change();
        this._changeDetRef.detectChanges();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
