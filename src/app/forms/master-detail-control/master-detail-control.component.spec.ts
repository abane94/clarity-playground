import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDetailControlComponent } from './master-detail-control.component';

describe('MasterDetailControlComponent', () => {
  let component: MasterDetailControlComponent;
  let fixture: ComponentFixture<MasterDetailControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDetailControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
