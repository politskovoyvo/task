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
    selector: 't-milty-select',
    templateUrl: './t-milty-select.component.html',
    styleUrls: ['./t-milty-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TMiltySelectComponent),
            multi: true,
        },
    ],
})
export class TMiltySelectComponent implements OnInit, ControlValueAccessor {
    @Input() value: any = {};
    @Input() width = '100px';
    @Input() isMulti = false;
    @Input() itemTemplate: TemplateRef<any>;
    @Input() type: 't-default' | 't-search' = 't-default';
    @Output() changeEmit = new EventEmitter();
    @Input() set items(items) {
        this._options = items;
    }

    _options: any[];

    constructor() {}

    ngOnInit(): void {}

    get isSelectedItems() {
        return this._options?.filter((i) => i?.isSelected) || [];
    }

    get isNotSelectedItems() {
        return this._options?.filter((i) => !i?.isSelected) || [];
    }

    onChange: any = () => {};

    change() {
        this.changeEmit.emit(this.isSelectedItems);
    }

    onTouched: any = () => {};

    openChange($event) {}

    writeValue(obj: any): void {
        if (!obj) {
            return;
        }

        if (!obj?.length) {
            obj.isSelected = !obj.isSelected;
            this.onChange(this.isSelectedItems);
            return;
        }

        this._options =
            this._options?.map((i, index, arr) => ({
                ...i,
                isSelected: obj.map((a) => a.id).includes(i.id),
            })) || [];

        this.value = this.isSelectedItems[0];
        this.onChange(this.isSelectedItems);
        this.change();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
