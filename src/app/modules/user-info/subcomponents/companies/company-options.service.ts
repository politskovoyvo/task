import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class CompanyOptionsService {
    private _companiesRefreshSubject$: ReplaySubject<any>;

    constructor() {
        this._companiesRefreshSubject$ = new ReplaySubject<any>();
    }

    refresh() {
        this._companiesRefreshSubject$.next();
    }

    getRefreshSubject$(): Observable<any> {
        return this._companiesRefreshSubject$.asObservable();
    }
}
