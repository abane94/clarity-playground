import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsListPageComponent } from './materials-list-page.component';

describe('MaterialsListPageComponent', () => {
  let component: MaterialsListPageComponent;
  let fixture: ComponentFixture<MaterialsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialsListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
