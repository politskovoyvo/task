import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyDto } from '@core/models/company.dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserCoreService {
    private readonly _TEST_URI = 'http://localhost:1234/user';

    constructor(private readonly _http: HttpClient) {}

    getCompanies(): Observable<CompanyDto[]> {
        return this._http.get<CompanyDto[]>(`${this._TEST_URI}/companies`, {
            withCredentials: true,
        });
    }

    removeCompany(companyId: number, reason: string) {
        return this._http.post(`${this._TEST_URI}/remove-company`, {
            companyId,
            reason,
            dt: new Date().toDateString(),
        });
    }
}
