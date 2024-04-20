import { CommonModule } from '@angular/common';
import { Component, ElementRef, output, viewChild } from '@angular/core';
import { SecondarySelectionType } from '../secondary-selection-type';

@Component({
  selector: 'list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  public hasPrimarySelection: boolean = false;
  public hasSecondarySelection: boolean = false;
  public mousedownEvent = output<ListItemComponent>();
  public hasPrimarySelectionBorderOnly: boolean = false;
  public SecondarySelectionType = SecondarySelectionType;
  public htmlElement = viewChild<ElementRef<HTMLElement>>('htmlElement');
  public secondarySelectionType: SecondarySelectionType | undefined | null;
  

  protected onItemDown() {
    this.mousedownEvent.emit(this);
  }



  public initialize(primarySelectedItemIsBorderOnly?: boolean) {
    this.hasPrimarySelection = false;
    this.secondarySelectionType = null;
    if (!primarySelectedItemIsBorderOnly) this.hasSecondarySelection = false;
  }
}