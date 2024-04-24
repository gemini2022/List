import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SelectableListItemComponent } from '../selectable-list-item/selectable-list-item.component';
import { SecondarySelectionType } from '../secondary-selection-type';

@Component({
  selector: 'multiselectable-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multiselectable-list-item.component.html',
  styleUrls: ['./../list-item/list-item.component.scss', './../selectable-list-item/selectable-list-item.component.scss', './multiselectable-list-item.component.scss']
})
export class MultiselectableListItemComponent extends SelectableListItemComponent {
  public isPivot: boolean = false;
  public hasUnselection: boolean = false;


  public setFirstItemSecondarySelectionType(secondItem: MultiselectableListItemComponent) {
    if (this.hasSecondarySelection && !this.hasPrimarySelection) {
      this.secondarySelectionType = secondItem.hasSecondarySelection || secondItem.hasUnselection ? SecondarySelectionType.Top : SecondarySelectionType.All;
    }
  }



  public setMiddleItemSecondarySelectionType(prevItem: MultiselectableListItemComponent, nextItem: MultiselectableListItemComponent) {
    if (this.hasSecondarySelection && !this.hasPrimarySelection) {
      if (!prevItem.hasSecondarySelection && nextItem.hasSecondarySelection) {
        this.secondarySelectionType = prevItem.hasUnselection ? SecondarySelectionType.Middle : SecondarySelectionType.Top;
      } else if (prevItem.hasSecondarySelection && !nextItem.hasSecondarySelection) {
        this.secondarySelectionType = nextItem.hasUnselection ? SecondarySelectionType.Middle : SecondarySelectionType.Bottom;
      } else if (!prevItem.hasSecondarySelection && !nextItem.hasSecondarySelection) {
        this.secondarySelectionType = prevItem.hasUnselection ? SecondarySelectionType.Bottom : nextItem.hasUnselection ? SecondarySelectionType.Top : SecondarySelectionType.All;
      } else if (prevItem.hasSecondarySelection && nextItem.hasSecondarySelection) {
        this.secondarySelectionType = SecondarySelectionType.Middle;
      }
    }
  }



  public setLastItemSecondarySelectionType(secondToLastItem: MultiselectableListItemComponent) {
    if (this.hasSecondarySelection && !this.hasPrimarySelection) {
      this.secondarySelectionType = secondToLastItem.hasSecondarySelection || secondToLastItem.hasUnselection ? SecondarySelectionType.Bottom : SecondarySelectionType.All;
    }
  }



  public override clearSelection() {
    super.clearSelection();
    this.isPivot = false;
    this.hasUnselection = false;
  }
}