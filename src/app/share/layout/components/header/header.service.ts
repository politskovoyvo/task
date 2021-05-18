import { Injectable, TemplateRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class HeaderService {
    _templateRef = new ReplaySubject<TemplateRef<any>>();

    get templateRef() {
        return this._templateRef.asObservable();
    }

    putHeaderTemplate(templateRef: TemplateRef<any>) {
        this._templateRef.next(templateRef);
    }
}
