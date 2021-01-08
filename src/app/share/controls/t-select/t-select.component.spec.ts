import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TSelectComponent } from './t-select.component';

describe('TSelectComponent', () => {
  let component: TSelectComponent;
  let fixture: ComponentFixture<TSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
