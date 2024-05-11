import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectableListItemComponent } from './multiselectable-list-item.component';

describe('MultiselectableListItemComponent', () => {
  let component: MultiselectableListItemComponent;
  let fixture: ComponentFixture<MultiselectableListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiselectableListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiselectableListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
