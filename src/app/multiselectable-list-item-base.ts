import { Directive } from "@angular/core";
import { SelectableListItemBase } from "./selectable-list-item-base";
import { MultiselectableListItemComponent } from "./multiselectable-list-item/multiselectable-list-item.component";
import { SecondarySelectionType } from "./secondary-selection-type";

@Directive()
export abstract class MultiselectableListItemBase<T extends MultiselectableListItemComponent> extends SelectableListItemBase {
    public isPivot: boolean = false;
    public hasUnselection: boolean = false;



    public override initialize() {
        super.initialize();
        this.hasUnselection = false;
    }



    public setFirstItemSecondarySelectionType(secondItem: T) {
        if (this.hasSecondarySelection && !this.hasPrimarySelection) {
          this.secondarySelectionType = secondItem.hasSecondarySelection || secondItem.hasUnselection ? SecondarySelectionType.Top : SecondarySelectionType.All;
        }
      }
    
    
    
      public setMiddleItemSecondarySelectionType(prevItem: T, nextItem: T) {
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
    
    
    
      public setLastItemSecondarySelectionType(secondToLastItem: T) {
        if (this.hasSecondarySelection && !this.hasPrimarySelection) {
          this.secondarySelectionType = secondToLastItem.hasSecondarySelection || secondToLastItem.hasUnselection ? SecondarySelectionType.Bottom : SecondarySelectionType.All;
        }
      }
}