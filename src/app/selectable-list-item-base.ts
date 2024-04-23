import { output, OutputRefSubscription, viewChild, ElementRef, Directive } from "@angular/core";
import { SecondarySelectionType } from "./secondary-selection-type";
import { SelectableListItemComponent } from "./selectable-list-item/selectable-list-item.component";

@Directive()
export abstract class SelectableListItemBase {
    public hasPrimarySelection: boolean = false;
    public hasSecondarySelection: boolean = false;
    public mousedownSubscription!: OutputRefSubscription;
    public hasPrimarySelectionBorderOnly: boolean = false;
    public SecondarySelectionType = SecondarySelectionType;
    public mousedownEvent = output<SelectableListItemComponent>();
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