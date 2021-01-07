import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TDropdownComponent } from './t-dropdown.component';

describe('TDropdownComponent', () => {
  let component: TDropdownComponent;
  let fixture: ComponentFixture<TDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
