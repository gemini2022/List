import { Component, ElementRef, OutputRefSubscription, output, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from '../list-item/list-item.component';
import { SecondarySelectionType } from '../secondary-selection-type';

@Component({
  selector: 'selectable-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selectable-list-item.component.html',
  styleUrls: ['./../list-item/list-item.component.scss', './selectable-list-item.component.scss']
})
export class SelectableListItemComponent extends ListItemComponent {
  public hasPrimarySelection: boolean = false;
  public hasSecondarySelection: boolean = false;
  public mousedownSubscription!: OutputRefSubscription;
  public rightClickSubscription!: OutputRefSubscription;
  public hasPrimarySelectionBorderOnly: boolean = false;
  public SecondarySelectionType = SecondarySelectionType;
  public mousedownEvent = output<SelectableListItemComponent>();
  public rightClickEvent = output<SelectableListItemComponent>();
  public htmlElement = viewChild<ElementRef<HTMLElement>>('htmlElement');
  public secondarySelectionType: SecondarySelectionType | undefined | null;


  protected onItemDown(e: MouseEvent) {
    if (e.button == 2) {
      this.rightClickEvent.emit(this);
    }else {
      this.mousedownEvent.emit(this);
    }
  }



  public clearSelection(primarySelectedItemIsBorderOnly?: boolean) {
    this.hasPrimarySelection = false;
    this.secondarySelectionType = null;
    if (!primarySelectedItemIsBorderOnly) this.hasSecondarySelection = false;
  }
}