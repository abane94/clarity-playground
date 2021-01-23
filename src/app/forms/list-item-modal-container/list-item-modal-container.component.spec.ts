import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemModalContainerComponent } from './list-item-modal-container.component';

describe('ListItemModalContainerComponent', () => {
  let component: ListItemModalContainerComponent;
  let fixture: ComponentFixture<ListItemModalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemModalContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
