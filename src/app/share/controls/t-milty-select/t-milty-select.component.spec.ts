import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TMiltySelectComponent } from './t-milty-select.component';

describe('TMiltySelectComponent', () => {
  let component: TMiltySelectComponent;
  let fixture: ComponentFixture<TMiltySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TMiltySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TMiltySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
