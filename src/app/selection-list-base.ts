import { Directive, Renderer2, contentChildren, inject, input, output } from "@angular/core";
import { ListBase } from "./list-base";
import { ListItemComponent } from "./list-item/list-item.component";
import { SecondarySelectionType } from "./secondary-selection-type";

@Directive()
export abstract class SelectionListBase extends ListBase {
    private renderer = inject(Renderer2);
    private eventListenersAdded!: boolean;
    private removeKeydownListener!: () => void;
    public selectionBorderWidth = input<string>();
    private items = contentChildren(ListItemComponent);
    public selectedItemEvent = output<ListItemComponent>();
    public loopSelection = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
    public multiselectable = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
    public noSelectOnArrowKey = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });


    
    private ngOnInit(): void {
        this.loopThroughItems();
    }



    private loopThroughItems(): void {
        this.items().forEach((item: ListItemComponent) => {
            this.setItemsMousedownSubscribe(item);
        })
    }



    private setItemsMousedownSubscribe(item: ListItemComponent): void {
        item.mousedownEvent.subscribe((item: ListItemComponent) => {
            this.selectItem(item);
        })
    }



    public selectItem(item: ListItemComponent): void {
        this.addEventListeners();
        item.htmlElement()!.nativeElement.focus();
        this.onItemSelectionUsingNoModifierKey(item);
        this.setSecondarySelectionType();
    }



    private addEventListeners(): void {
        if (this.eventListenersAdded) return;
        this.eventListenersAdded = true;
        this.removeKeydownListener = this.renderer.listen('window', 'keydown', (e: KeyboardEvent) => this.onKeyDown(e));
    }



    private onItemSelectionUsingNoModifierKey(item: ListItemComponent): void {
        this.initializeItems(item.hasPrimarySelectionBorderOnly);
        item.hasPrimarySelection = true;
        if (!item.hasPrimarySelectionBorderOnly) {
            item.hasSecondarySelection = true;
            this.selectedItemEvent.emit(item);
        } else {
            item.hasPrimarySelectionBorderOnly = false;
        }
    }



    private setSecondarySelectionType(): void {
        if (this.items().length !== 1) {
            const firstItem = this.items()[0];
            if (firstItem.hasSecondarySelection && !firstItem.hasPrimarySelection) firstItem.secondarySelectionType = SecondarySelectionType.All;
            for (let i = 1; i < this.items().length - 1; i++) {
                if (this.items()[i].hasSecondarySelection && !this.items()[i].hasPrimarySelection) this.items()[i].secondarySelectionType = SecondarySelectionType.All;
            }
            const lastItem = this.items()[this.items().length - 1];
            if (lastItem.hasSecondarySelection && !lastItem.hasPrimarySelection) lastItem.secondarySelectionType = SecondarySelectionType.All;
        }
    }



    private onKeyDown(e: KeyboardEvent): void {
        switch (e.key) {
            case 'Enter':
                this.onEnter(e);
                break;
            case 'ArrowUp':
                this.onArrowKey(e, -1);
                break;
            case 'ArrowDown':
                this.onArrowKey(e, 1);
                break;
        }
    }



    private initializeItems(primarySelectedItemIsBorderOnly?: boolean): void {
        this.items().forEach(item => {
            item.initialize(primarySelectedItemIsBorderOnly);
        });
    }



    private onEnter(e: KeyboardEvent): void {
        e.preventDefault();
        const itemHasPrimarySelectionBorderOnly = this.items().find(item => item.hasPrimarySelection && !item.hasSecondarySelection);
        if (itemHasPrimarySelectionBorderOnly) {
            this.selectItem(itemHasPrimarySelectionBorderOnly);
        }
    }



    private onArrowKey(e: KeyboardEvent, direction: number): void {
        e.preventDefault();
        const currentSelectedItem = this.items().find(x => x.hasPrimarySelection);
        if (currentSelectedItem) this.selectItemOnArrowKey(currentSelectedItem, direction);
    }



    private selectItemOnArrowKey(currentSelectedItem: ListItemComponent, direction: number) {
        const currentSelectedItemIndex = this.items().indexOf(currentSelectedItem);
        const nextIndex = this.loopSelection() ? (currentSelectedItemIndex + direction + this.items().length) % this.items().length : currentSelectedItemIndex + direction;

        if (this.noSelectOnArrowKey()) {
            const nextItem = this.items()[nextIndex];
            if (nextItem) nextItem.hasPrimarySelectionBorderOnly = true;
        }
        if (nextIndex >= 0 && nextIndex < this.items().length) this.selectItem(this.items()[nextIndex]);
    }



    private ngOnDestroy(): void {
        this.removeKeydownListener();
    }
}