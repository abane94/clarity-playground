import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDefinedFormDataDisplayComponent } from './user-defined-form-data-display.component';

describe('UserDefinedFormDataDisplayComponent', () => {
  let component: UserDefinedFormDataDisplayComponent;
  let fixture: ComponentFixture<UserDefinedFormDataDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDefinedFormDataDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDefinedFormDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
