import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    @Input() items: any[] = [];
    @Input() value: any = {};
    @Input() width = '100px';
    @Input() isMulti = false;
    @Input() itemTemplate: TemplateRef<any>;
    @Input() type: 't-default' | 't-search' = 't-default';

    @Output() changeEmit = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    get isSelectedItems() {
        return this.items.filter((i) => i?.isSelected);
    }

    get isNotSelectedItems() {
        return this.items.filter((i) => !i?.isSelected);
    }

    onChange: any = () => {};

    change() {
        this.changeEmit.emit(this.value);
    }

    onTouched: any = () => {};

    openChange($event) {
        console.log($event);
    }

    writeValue(obj: any): void {
        if (!obj) {
            return;
        }
        if (this.isMulti) {
            obj.isSelected = !obj.isSelected;
            this.onChange(this.isSelectedItems);
            return;
        }
        this.onChange(this.value);
        this.change();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
