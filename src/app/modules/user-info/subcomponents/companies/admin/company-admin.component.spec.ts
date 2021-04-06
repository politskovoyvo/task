import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminComponent } from './company-admin.component';

describe('SettingComponent', () => {
    let component: CompanyAdminComponent;
    let fixture: ComponentFixture<CompanyAdminComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CompanyAdminComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanyAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
