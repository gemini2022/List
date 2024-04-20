import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemTextComponent } from './list-item-text.component';

describe('ListItemTextComponent', () => {
  let component: ListItemTextComponent;
  let fixture: ComponentFixture<ListItemTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListItemTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
