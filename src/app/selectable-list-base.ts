import { Directive, Renderer2, contentChildren, effect, inject, input, output } from "@angular/core";
import { SecondarySelectionType } from "./secondary-selection-type";
import { SelectableListItemComponent } from "./selectable-list-item/selectable-list-item.component";

@Directive()
export abstract class SelectableListBase<T extends SelectableListItemComponent> {
    protected renderer = inject(Renderer2);
    private eventListenersAdded!: boolean;
    private removeKeydownListener!: () => void;
    public selectionBorderWidth = input<string>();
    protected items = contentChildren(SelectableListItemComponent);
    public selectedItemEvent = output<Array<SelectableListItemComponent>>();
    public loopSelection = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
    public multiselectable = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
    public noSelectOnArrowKey = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });


    constructor() {
        effect(() => {
            this.items().forEach((item) => {
                this.initializeItem(item as T);
            })
        })
    }



    private initializeItem(item: T) {
        this.setItemMousedownSubscription(item);
    }



    private setItemMousedownSubscription(item: T): void {
        if (item.mousedownSubscription) item.mousedownSubscription.unsubscribe();
        item.mousedownSubscription = item.mousedownEvent.subscribe((item: SelectableListItemComponent) => {
            this.selectItem(item as T);
        })
    }



    public selectItem(item: T): void {
        this.addEventListeners();
        item.htmlElement()!.nativeElement.focus();
        this.setSelectedItems(item);
        
    }



    protected addEventListeners(): void {
        if (this.eventListenersAdded) return;
        this.eventListenersAdded = true;
        this.removeKeydownListener = this.renderer.listen('window', 'keydown', (e: KeyboardEvent) => this.onKeyDown(e));
    }



    protected setSelectedItems(item: T): void {
        this.onItemSelectionUsingNoModifierKey(item);
        this.setSecondarySelectionType();
    }



    protected onItemSelectionUsingNoModifierKey(item: T): void {
        this.initializeItems(item.hasPrimarySelectionBorderOnly);
        item.hasPrimarySelection = true;
        if (!item.hasPrimarySelectionBorderOnly) {
            item.hasSecondarySelection = true;
            this.selectedItemEvent.emit([item]);
        } else {
            item.hasPrimarySelectionBorderOnly = false;
        }
    }



    protected setSecondarySelectionType(): void {
        const firstItem = this.items()[0];
        if (firstItem.hasSecondarySelection && !firstItem.hasPrimarySelection) firstItem.secondarySelectionType = SecondarySelectionType.All;
        for (let i = 1; i < this.items().length - 1; i++) {
            if (this.items()[i].hasSecondarySelection && !this.items()[i].hasPrimarySelection) this.items()[i].secondarySelectionType = SecondarySelectionType.All;
        }
        const lastItem = this.items()[this.items().length - 1];
        if (lastItem.hasSecondarySelection && !lastItem.hasPrimarySelection) lastItem.secondarySelectionType = SecondarySelectionType.All;
    }



    protected onKeyDown(e: KeyboardEvent): void {
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
        this.items().forEach(item => item.initialize(primarySelectedItemIsBorderOnly));
    }



    private onEnter(e: KeyboardEvent): void {
        e.preventDefault();
        const itemHasPrimarySelectionBorderOnly = this.items().find(item => item.hasPrimarySelection && !item.hasSecondarySelection);
        if (itemHasPrimarySelectionBorderOnly) {
            this.selectItem(itemHasPrimarySelectionBorderOnly as T);
        }
    }



    private onArrowKey(e: KeyboardEvent, direction: number): void {
        e.preventDefault();
        const currentSelectedItem = this.items().find(x => x.hasPrimarySelection);
        if (currentSelectedItem) this.selectItemOnArrowKey(currentSelectedItem, direction);
    }



    private selectItemOnArrowKey(currentSelectedItem: SelectableListItemComponent, direction: number) {
        const currentSelectedItemIndex = this.items().indexOf(currentSelectedItem);
        const nextIndex = this.loopSelection() ? (currentSelectedItemIndex + direction + this.items().length) % this.items().length : currentSelectedItemIndex + direction;

        if (this.noSelectOnArrowKey()) {
            const nextItem = this.items()[nextIndex];
            if (nextItem) nextItem.hasPrimarySelectionBorderOnly = true;
        }
        if (nextIndex >= 0 && nextIndex < this.items().length) this.selectItem(this.items()[nextIndex] as T);
    }



    protected ngOnDestroy(): void {
        if (this.removeKeydownListener) this.removeKeydownListener();
    }
}