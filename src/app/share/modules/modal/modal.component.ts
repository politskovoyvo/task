import {
    Component,
    ViewEncapsulation,
    ElementRef,
    Input,
    OnInit,
    OnDestroy,
} from '@angular/core';

import { ModalService } from './modal.service';
import { IModalConfigs } from '@share/modules/modal/models/modal-configs.interface';

@Component({
    selector: 'modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id?: string;

    configs: IModalConfigs = {} as IModalConfigs;

    private readonly _element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this._element = el.nativeElement;
    }

    ngOnInit(): void {
        if (!this.id) {
            return;
        }

        document.body.appendChild(this._element);

        this._element.addEventListener('click', (el: any) => {
            if (el.target.className === 'modal') {
                this.close();
            }
        });

        this.modalService.add(this);
    }

    ngOnDestroy(): void {
        if (!this.id) {
            return;
        }
        this.modalService.remove(this.id);
        this._element.remove();
    }

    open(): void {
        this._element.style.display = 'block';
        document.body.classList.add('modal-open');
    }

    create(configs: IModalConfigs): void {
        this.configs = configs;

        this._element.style.display = 'block';
        document.body.classList.add('modal-open');
    }

    close(): void {
        this._element.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}
