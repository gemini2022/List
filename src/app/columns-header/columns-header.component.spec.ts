import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsHeaderComponent } from './columns-header.component';

describe('ColumnsHeaderComponent', () => {
  let component: ColumnsHeaderComponent;
  let fixture: ComponentFixture<ColumnsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnsHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColumnsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
