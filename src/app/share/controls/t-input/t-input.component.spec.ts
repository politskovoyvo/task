import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TInputComponent } from './t-input.component';

describe('TInputComponent', () => {
  let component: TInputComponent;
  let fixture: ComponentFixture<TInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
