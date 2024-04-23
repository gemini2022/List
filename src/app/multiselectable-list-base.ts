import { Directive, contentChildren } from "@angular/core";
import { SelectableListBase } from "./selectable-list-base";
import { MultiselectableListItemComponent } from "./multiselectable-list-item/multiselectable-list-item.component";

@Directive()
export abstract class MultiselectableListBase<T extends MultiselectableListItemComponent> extends SelectableListBase<T> {
    private ctrlKeyDown: boolean = false;
    private shiftKeyDown: boolean = false;
    private removeKeyupListener!: () => void;
    protected override items = contentChildren(MultiselectableListItemComponent);


    protected override addEventListeners(): void {
        super.addEventListeners();
        this.removeKeyupListener = this.renderer.listen('window', 'keyup', (e: KeyboardEvent) => this.onKeyUp(e));
    }



    protected override onKeyDown(e: KeyboardEvent): void {
        super.onKeyDown(e);
        switch (e.key) {
            case 'Shift': case 'Control':
                e.key == 'Shift' ? this.shiftKeyDown = true : this.ctrlKeyDown = true;
                break;
        }
    }



    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key) {
            case 'Shift': case 'Control':
                e.key == 'Shift' ? this.shiftKeyDown = false : this.ctrlKeyDown = false;
                break;
        }
    }



    protected override setSelectedItems(item: T): void {
        if (this.shiftKeyDown) {
            this.onItemSelectionUsingShiftKey(item);
        } else if (this.ctrlKeyDown) {
            this.onItemSelectionUsingCtrlKey(item);
        } else {
            this.onItemSelectionUsingNoModifierKey(item);
        }
        this.setSecondarySelectionType();
    }



    private onItemSelectionUsingShiftKey(item: T): void {
        let selectedItems: Array<T> = new Array<T>();

        this.items().forEach(item => item.initialize());
        const selectedItemIndex = this.items().indexOf(item);
        const pivotItem = this.items().find(x => x.isPivot);
        const indexOfPivotItem = pivotItem ? this.items().indexOf(pivotItem) : -1;
        const start = Math.min(indexOfPivotItem, selectedItemIndex);
        const end = Math.max(indexOfPivotItem, selectedItemIndex);

        for (let i = start; i <= end; i++) {
            selectedItems.push(this.items()[i] as T);
            const itemComponent = this.items()[i];
            if (itemComponent !== undefined) itemComponent.hasSecondarySelection = true;
        }
        this.selectedItemEvent.emit(selectedItems);
        item.hasPrimarySelection = true;
    }



    private onItemSelectionUsingCtrlKey(item: T): void {
        this.items().forEach(item => {
            item.isPivot = false;
            item.hasUnselection = false;
            item.hasPrimarySelection = false;
            item.secondarySelectionType = null;
        });
        item.isPivot = true;
        item.hasUnselection = item.hasSecondarySelection;
        item.hasPrimarySelection = !item.hasSecondarySelection;
        item.hasSecondarySelection = !item.hasUnselection;
        this.selectedItemEvent.emit([item]);
    }



    protected override onItemSelectionUsingNoModifierKey(item: T): void {
        super.onItemSelectionUsingNoModifierKey(item);
        item.isPivot = true;
    }



    protected override setSecondarySelectionType(): void {
        if (this.items().length > 1) {
            this.items()[0].setFirstItemSecondarySelectionType(this.items()[1]);
            for (let i = 1; i < this.items().length - 1; i++) {
                this.items()[i].setMiddleItemSecondarySelectionType(this.items()[i - 1], this.items()[i + 1]);
            }
            this.items()[this.items().length - 1].setLastItemSecondarySelectionType(this.items()[this.items().length - 2]);
        }
    }



    protected override ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this.removeKeyupListener) this.removeKeyupListener();
    }
}