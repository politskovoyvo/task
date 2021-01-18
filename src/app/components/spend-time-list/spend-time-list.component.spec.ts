import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendTimeListComponent } from './spend-time-list.component';

describe('SpendTimeListComponent', () => {
  let component: SpendTimeListComponent;
  let fixture: ComponentFixture<SpendTimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendTimeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
