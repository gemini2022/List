import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizableHeaderColumnComponent } from './resizable-header-column.component';

describe('ResizableHeaderColumnComponent', () => {
  let component: ResizableHeaderColumnComponent;
  let fixture: ComponentFixture<ResizableHeaderColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResizableHeaderColumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResizableHeaderColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
