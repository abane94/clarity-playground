import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDefinedFormViewerComponent } from './user-defined-form-viewer.component';

describe('UserDefinedFormViewerComponent', () => {
  let component: UserDefinedFormViewerComponent;
  let fixture: ComponentFixture<UserDefinedFormViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDefinedFormViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDefinedFormViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
