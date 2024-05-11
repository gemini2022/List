import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectableListComponent } from './multiselectable-list.component';

describe('MultiselectableListComponent', () => {
  let component: MultiselectableListComponent;
  let fixture: ComponentFixture<MultiselectableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiselectableListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiselectableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
