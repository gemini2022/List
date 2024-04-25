import { Component, Renderer2, contentChildren, effect, inject, input, output } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { SelectableListItemComponent } from '../selectable-list-item/selectable-list-item.component';
import { SecondarySelectionType } from '../secondary-selection-type';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'selectable-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './selectable-list.component.html',
    styleUrls: ['./../list/list.component.scss', './selectable-list.component.scss']
})
export class SelectableListComponent extends ListComponent {
    protected itemRightClicked!: boolean;
    protected renderer = inject(Renderer2);
    private eventListenersAdded!: boolean;
    private removeKeydownListener!: () => void;
    public itemSelectedEvent = output<number>();
    public selectionBorderWidth = input<string>();
    public itemRightClickedEvent = output<number>();
    public itemNonSelectedOnArrowKeyEvent = output<number>();
    protected override items = contentChildren(SelectableListItemComponent);
    public loopSelection = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
    public multiselectable = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
    public noSelectOnArrowKey = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });


    constructor() {
        super();
        effect(() => {
            this.items().forEach((item) => {
                this.addItemMousedownSubscription(item);
                this.addItemRightClickSubscription(item);
            })
        })
    }



    private addItemMousedownSubscription(item: SelectableListItemComponent): void {
        if (item.mousedownSubscription) item.mousedownSubscription.unsubscribe();
        item.mousedownSubscription = item.mousedownEvent.subscribe((item: SelectableListItemComponent) => {
            this.selectItem(this.items().indexOf(item));
        })
    }



    private addItemRightClickSubscription(item: SelectableListItemComponent): void {
        if (item.rightClickSubscription) item.rightClickSubscription.unsubscribe();
        item.rightClickSubscription = item.rightClickEvent.subscribe((item: SelectableListItemComponent) => {
            this.onItemRightClick(item);
        })
    }



    protected onItemRightClick(item: SelectableListItemComponent): void {
        this.itemRightClicked = true;
        this.selectItem(this.items().indexOf(item));
    }



    public selectItem(itemIndex: number): void {
        this.addEventListeners();
        this.items()[itemIndex].htmlElement()!.nativeElement.focus();
        this.setSelectedItems(this.items()[itemIndex]);

    }



    private addEventListeners(): void {
        if (this.eventListenersAdded) return;
        this.eventListenersAdded = true;
        this.removeKeydownListener = this.renderer.listen('window', 'keydown', (e: KeyboardEvent) => this.onKeyDown(e));
    }



    protected setSelectedItems(item: SelectableListItemComponent): void {
        this.onItemSelectionUsingNoModifierKey(item);
        this.setSecondarySelectionType();
    }



    protected onItemSelectionUsingNoModifierKey(item: SelectableListItemComponent): void {
        this.updatePrimarySelection(item, item.hasPrimarySelectionBorderOnly);
        if (!item.hasPrimarySelectionBorderOnly) {
            item.hasSecondarySelection = true;
            if (this.itemRightClicked) {
                this.itemRightClicked = false;
                this.itemRightClickedEvent.emit(this.items().indexOf(item));
            } else {
                this.itemSelectedEvent.emit(this.items().indexOf(item));
            }

        } else {
            item.hasPrimarySelectionBorderOnly = false;
            this.itemNonSelectedOnArrowKeyEvent.emit(this.items().indexOf(item));
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



    protected updatePrimarySelection(item: SelectableListItemComponent, hasPrimarySelectionBorderOnly: boolean): void {
        this.items().forEach(item => item.clearSelection(hasPrimarySelectionBorderOnly));
        item.hasPrimarySelection = true;
    }



    protected onEnter(e: KeyboardEvent): void {
        e.preventDefault();
        const itemHasPrimarySelectionBorderOnly = this.items().find(item => item.hasPrimarySelection && !item.hasSecondarySelection);
        if (itemHasPrimarySelectionBorderOnly) {
            this.selectItem(this.items().indexOf(itemHasPrimarySelectionBorderOnly));
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
        if (nextIndex >= 0 && nextIndex < this.items().length) this.selectItem(nextIndex);
    }



    public clearSelection() {
        this.items().forEach(item => item.clearSelection());
        this.removeEventListeners();
    }



    protected removeEventListeners() {
        this.eventListenersAdded = false;
        if (this.removeKeydownListener) this.removeKeydownListener();
    }



    private removeSubscriptions() {
        this.items().forEach((item) => {
            if (item.mousedownSubscription) item.mousedownSubscription.unsubscribe();
            if (item.rightClickSubscription) item.rightClickSubscription.unsubscribe();
        })
    }



    protected ngOnDestroy(): void {
        this.removeEventListeners();
        this.removeSubscriptions();
    }
}