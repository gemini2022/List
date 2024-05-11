import { Component, contentChildren, output } from '@angular/core';
import { MultiselectableListItemComponent } from '../multiselectable-list-item/multiselectable-list-item.component';
import { CommonModule } from '@angular/common';
import { SelectableListComponent } from 'selectable-list';

@Component({
  selector: 'multiselectable-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multiselectable-list.component.html',
  styleUrls: ['../../../../list/src/lib/list/list.component.scss', './multiselectable-list.component.scss']
})
export class MultiselectableListComponent extends SelectableListComponent {
  // Output
  public itemsSelectedEvent = output<Array<number>>();

  // Private
  private keyDown: boolean = false;
  private ctrlKeyDown: boolean = false;
  private shiftKeyDown: boolean = false;
  private removeKeyupListener!: () => void;
  protected override items = contentChildren(MultiselectableListItemComponent);


  
  protected override onKeyDown(e: KeyboardEvent): void {
    super.onKeyDown(e);
    switch (e.key) {
      case 'Shift': case 'Control':
        this.onShiftAndControlKeys(e);
        break;
    }
  }



  protected onShiftAndControlKeys(e: KeyboardEvent) {
    if (!this.keyDown) {
      this.keyDown = true;
      e.key == 'Shift' ? this.shiftKeyDown = true : this.ctrlKeyDown = true;
      this.removeKeyupListener = this.renderer.listen('window', 'keyup', (e: KeyboardEvent) => this.onKeyUp(e));
    }
  }



  private onKeyUp(e: KeyboardEvent): void {
    switch (e.key) {
      case 'Shift': case 'Control':
        this.keyDown = false;
        this.removeKeyupListener();
        e.key == 'Shift' ? this.shiftKeyDown = false : this.ctrlKeyDown = false;
        break;
    }
  }



  protected override setSelectedItems(item: MultiselectableListItemComponent): void {
    if (this.shiftKeyDown && !this.itemRightMouseDown) {
      this.onItemSelectionUsingShiftKey(item);
    } else if (this.ctrlKeyDown && !this.itemRightMouseDown) {
      this.onItemSelectionUsingCtrlKey(item);
    } else {
      this.onItemSelectionUsingNoModifierKey(item);
    }
    this.setSecondarySelectionType();
  }



  private onItemSelectionUsingShiftKey(item: MultiselectableListItemComponent): void {
    let selectedItems: Array<number> = [];

    this.items().forEach(item => {
      item.hasUnselection = false;
      item.hasPrimarySelection = false;
      item.hasSecondarySelection = false;
      item.secondarySelectionType = null!;
    });

    const selectedItemIndex = this.items().indexOf(item);
    const pivotItem = this.items().find(x => x.isPivot);
    const indexOfPivotItem = pivotItem ? this.items().indexOf(pivotItem) : -1;
    const start = Math.min(indexOfPivotItem, selectedItemIndex);
    const end = Math.max(indexOfPivotItem, selectedItemIndex);

    for (let i = start; i <= end; i++) {
      selectedItems.push(this.items().indexOf(this.items()[i]));
      const itemComponent = this.items()[i];
      if (itemComponent !== undefined) itemComponent.hasSecondarySelection = true;
    }
    this.itemsSelectedEvent.emit(selectedItems);
    item.hasPrimarySelection = true;
    this.currentSelectedItem = item;
  }



  private onItemSelectionUsingCtrlKey(item: MultiselectableListItemComponent): void {
    this.items().forEach(item => {
      item.isPivot = false;
      item.hasUnselection = false;
      item.hasPrimarySelection = false;
      item.secondarySelectionType = null!;
    });
    item.isPivot = true;
    item.hasUnselection = item.hasSecondarySelection;
    item.hasPrimarySelection = !item.hasSecondarySelection;
    item.hasSecondarySelection = !item.hasUnselection;
    this.itemsSelectedEvent.emit([this.items().indexOf(item)]);
    this.currentSelectedItem = item;
  }



  protected override onItemSelectionUsingNoModifierKey(item: MultiselectableListItemComponent): void {
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



  protected override updatePrimarySelection(item: MultiselectableListItemComponent, hasPrimarySelectionBorderOnly: boolean): void {
    if (!(this.itemRightMouseDown && item.hasSecondarySelection)) super.updatePrimarySelection(item, hasPrimarySelectionBorderOnly);
  }



  protected override removeEventListeners() {
    super.removeEventListeners();
    if (this.removeKeyupListener) this.removeKeyupListener();
  }
}