import { Component, Renderer2, contentChildren, inject, input, output } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { SelectableListItemComponent } from '../selectable-list-item/selectable-list-item.component';
import { CommonModule, KeyValue } from '@angular/common';
import { SecondarySelectionType } from '../secondary-selection-type';

@Component({
    selector: 'selectable-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './selectable-list.component.html',
    styleUrls: ['./../list/list.component.scss', './selectable-list.component.scss']
})
export class SelectableListComponent extends ListComponent {
    // Inputs
    public loopSelection = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
    public allowItemClick = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
    public noSelectOnArrowKey = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
    public allowListToUnselect = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
    public allowItemRightClick = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
    public allowItemDoubleClick = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });

    // Outputs
    public itemClickedEvent = output<number>();
    public itemMouseDownedEvent = output<number>();
    public itemRightClickedEvent = output<number>();
    public itemDoubleClickedEvent = output<number>();
    public itemRightMouseDownedEvent = output<number>();
    public itemNonSelectedOnArrowKeyEvent = output<number>();

    // Private
    private eventListenersAdded!: boolean;
    protected itemRightMouseDown!: boolean;
    protected renderer = inject(Renderer2);
    private removeKeydownListener!: () => void;
    private removeListMouseDownListener!: () => void;
    private _preventListFromUnselecting: boolean = false;
    protected removeWindowMouseDownListener!: () => void;
    protected currentSelectedItem!: SelectableListItemComponent;
    private _preventListFromUnselectingOnEscapeKey: boolean = false;
    private _preventListFromUnselectingOnMouseDown: boolean = false;
    protected override items = contentChildren(SelectableListItemComponent);



    protected override setItems(item: SelectableListItemComponent): void {
        super.setItems(item);
        this.setItemMouseDownSubscription(item);
        if (this.allowItemClick()) this.setItemClickSubscription(item);
        if (this.allowItemRightClick()) this.setItemRightClickSubscription(item);
        if (this.allowItemDoubleClick()) this.setItemDoubleClickSubscription(item);
    }



    private setItemClickSubscription(item: SelectableListItemComponent): void {
        if (item.clickSubscription) return;
        item.clickSubscription = item.clickedEvent.subscribe((item: SelectableListItemComponent) => {
            this.itemClickedEvent.emit(this.items().indexOf(item));
        })
    }



    private setItemMouseDownSubscription(item: SelectableListItemComponent): void {
        if (item.mouseDownSubscription) return;
        item.mouseDownSubscription = item.mouseDownedEvent.subscribe((keyValue: KeyValue<SelectableListItemComponent, boolean>) => {
            this.itemRightMouseDown = keyValue.value;
            this.selectItem(this.items().indexOf(keyValue.key));
            this.itemRightMouseDown = false;
        })
    }



    private setItemRightClickSubscription(item: SelectableListItemComponent): void {
        if (item.rightClickSubscription) return;
        item.rightClickSubscription = item.rightClickedEvent.subscribe((item: SelectableListItemComponent) => {
            this.onItemRightClick(item);
        })
    }



    private setItemDoubleClickSubscription(item: SelectableListItemComponent): void {
        if (item.doubleClickSubscription) return;
        item.doubleClickSubscription = item.doubleClickedEvent.subscribe((item: SelectableListItemComponent) => {
            this.onItemDoubleClick(item);
        })
    }



    public selectItem(itemIndex: number): void {
        this.addEventListeners();
        this.items()[itemIndex].htmlElement()!.nativeElement.focus();
        this.setSelectedItems(this.items()[itemIndex]);
    }



    protected onItemRightClick(item: SelectableListItemComponent): void {
        this.itemRightClickedEvent.emit(this.items().indexOf(item));
    }



    protected onItemDoubleClick(item: SelectableListItemComponent): void {
        this.itemDoubleClickedEvent.emit(this.items().indexOf(item));
    }



    private addEventListeners(): void {
        if (this.eventListenersAdded) return;
        this.eventListenersAdded = true;
        this.setWindowMouseDownListener();
        this.removeKeydownListener = this.renderer.listen('window', 'keydown', (e: KeyboardEvent) => this.onKeyDown(e));
        if (this.allowListToUnselect()) this.removeListMouseDownListener = this.renderer.listen(this.list()?.nativeElement, 'mousedown', ((e: MouseEvent) => this.onListMouseDown(e)));
    }



    protected setSelectedItems(item: SelectableListItemComponent): void {
        this.onItemSelectionUsingNoModifierKey(item);
        this.setSecondarySelectionType();
    }



    protected setWindowMouseDownListener() {
        if (this.allowListToUnselect()) this.removeWindowMouseDownListener = this.renderer.listen('window', 'mousedown', (() => this.onWindowMouseDown()));
    }



    protected onItemSelectionUsingNoModifierKey(item: SelectableListItemComponent): void {
        this.updatePrimarySelection(item, item.hasPrimarySelectionBorderOnly);
        if (!item.hasPrimarySelectionBorderOnly) {
            item.hasSecondarySelection = true;
            if (this.itemRightMouseDown) {
                this.itemRightMouseDownedEvent.emit(this.items().indexOf(item));
            } else {
                this.itemMouseDownedEvent.emit(this.items().indexOf(item));
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



    private onListMouseDown(e: MouseEvent): void {
        if (e.clientX - this.list()!.nativeElement.getBoundingClientRect().left >= this.list()!.nativeElement.clientWidth) this.stopMouseDownPropagation();
        if (e.clientY - this.list()!.nativeElement.getBoundingClientRect().top >= this.list()!.nativeElement.clientHeight) this.stopMouseDownPropagation();
    }



    protected onWindowMouseDown(): void {
        if (this.currentSelectedItem.stopMouseDownPropagation) {
            this.currentSelectedItem.stopMouseDownPropagation = false;
            return;
        }
        if (this.allowListToUnselect() && !this._preventListFromUnselecting && !this._preventListFromUnselectingOnMouseDown) this.clearSelection();
    }



    protected onKeyDown(e: KeyboardEvent): void {
        switch (e.key) {
            case 'Enter':
                this.onEnterKey(e);
                break;
            case 'Escape':
                this.onEscapeKey(e);
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
        this.currentSelectedItem = item;
    }



    protected onEnterKey(e: KeyboardEvent): void {
        e.preventDefault();
        const itemHasPrimarySelectionBorderOnly = this.items().find(item => item.hasPrimarySelection && !item.hasSecondarySelection);
        if (itemHasPrimarySelectionBorderOnly) {
            this.selectItem(this.items().indexOf(itemHasPrimarySelectionBorderOnly));
        }
    }



    protected onEscapeKey(e: KeyboardEvent): void {
        e.preventDefault();
        if (this.allowListToUnselect() && !this._preventListFromUnselecting && !this._preventListFromUnselectingOnEscapeKey) {
            this.clearSelection();
        }
    }



    protected onArrowKey(e: KeyboardEvent, direction: number): void {
        e.preventDefault();

        const currentSelectedItemIndex = this.items().indexOf(this.currentSelectedItem);
        const nextIndex = this.loopSelection() ? (currentSelectedItemIndex + direction + this.items().length) % this.items().length : currentSelectedItemIndex + direction;
        if (this.noSelectOnArrowKey()) {
            const nextItem = this.items()[nextIndex];
            if (nextItem) nextItem.hasPrimarySelectionBorderOnly = true;
        }
        if (nextIndex >= 0 && nextIndex < this.items().length) this.selectItem(nextIndex);
    }



    public clearSelection(): void {
        this.items().forEach(item => item.clearSelection());
        this.removeEventListeners();
    }



    public stopMouseDownPropagation(): void {
        if (this.currentSelectedItem) this.currentSelectedItem.stopMouseDownPropagation = true;
    }



    public preventListFromUnselecting(value: boolean): void {
        this._preventListFromUnselecting = value;
    }



    public preventListFromUnselectingOnEscapeKey(value: boolean): void {
        this._preventListFromUnselectingOnEscapeKey = value;
    }



    public preventListFromUnselectingOnMouseDown(value: boolean): void {
        this._preventListFromUnselectingOnMouseDown = value;
    }



    protected removeEventListeners() {
        this.eventListenersAdded = false;
        if (this.removeKeydownListener) this.removeKeydownListener();
        if (this.removeListMouseDownListener) this.removeListMouseDownListener();
        if (this.removeWindowMouseDownListener) this.removeWindowMouseDownListener();
    }



    private removeSubscriptions() {
        this.items().forEach((item) => {
            if (item.mouseDownSubscription) item.mouseDownSubscription.unsubscribe();
            if (item.rightClickSubscription) item.rightClickSubscription.unsubscribe();
        })
    }



    protected ngOnDestroy(): void {
        this.removeEventListeners();
        this.removeSubscriptions();
    }
}