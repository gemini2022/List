import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableListItemTextComponent } from './editable-list-item-text.component';

describe('EditableListItemTextComponent', () => {
  let component: EditableListItemTextComponent;
  let fixture: ComponentFixture<EditableListItemTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableListItemTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditableListItemTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
