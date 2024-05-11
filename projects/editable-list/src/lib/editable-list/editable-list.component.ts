import { Component, contentChildren, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableListItemComponent } from '../editable-list-item/editable-list-item.component';
import { MultiselectableListComponent } from 'multiselectable-list';

@Component({
  selector: 'editable-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editable-list.component.html',
  styleUrls: ['../../../../list/src/lib/list/list.component.scss', './editable-list.component.scss']
})
export class EditableListComponent extends MultiselectableListComponent {
  // Input
  public allowMultiselection = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
  public allowItemEditOnDoubleClick = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });

  // Outputs
  public textInputedEvent = output<string>();
  public textRightClickedEvent = output<number>();
  public editExitedOnEnterKeyEvent = output<number>();
  public editExitedOnEscapeKeyEvent = output<number>();
  public editExitedOnMouseDownEvent = output<number>();

  // Private
  private _preventEditExit: boolean = false;
  private itemInEditMode!: EditableListItemComponent;
  private _preventEditExitOnEnterKey: boolean = false;
  private _preventEditExitOnEscapeKey: boolean = false;
  private _preventEditExitOnMouseDown: boolean = false;
  protected override items = contentChildren(EditableListItemComponent);



  protected override setItems(item: EditableListItemComponent): void {
    super.setItems(item);
    this.setItemTextInputSubscription(item);
    this.setItemTextRightClickSubscription(item);
  }



  private setItemTextInputSubscription(item: EditableListItemComponent): void {
    if (item.getItemText()?.inputSubscription) return;
    if (item.getItemText()) item.getItemText().inputSubscription = item.getItemText()?.inputedEvent.subscribe((text: string) => {
      this.textInputedEvent.emit(text);
    })
  }



  private setItemTextRightClickSubscription(item: EditableListItemComponent): void {
    if (item.getItemText()?.rightClickSubscription) return;
    if (item.getItemText()) item.getItemText().rightClickSubscription = item.getItemText()?.rightClickedEvent.subscribe(() => {
      this.textRightClickedEvent.emit(this.items().indexOf(item));
    })
  }



  public override selectItem(itemIndex: number): void {
    if (!this._preventEditExit && !this._preventEditExitOnMouseDown) {
      super.selectItem(itemIndex);
      if (this.itemInEditMode) {
        this.itemInEditMode.stopMouseDownPropagation = false;
        this.exitEdit();
      }
    }
  }



  protected override onItemRightClick(item: EditableListItemComponent): void {
    if (!item.getItemText()?.stopRightClickPropagation) {
      super.onItemRightClick(item);
    } else {
      if (item.getItemText()) item.getItemText().stopRightClickPropagation = false;
    }
  }



  protected override onItemDoubleClick(item: EditableListItemComponent): void {
    super.onItemDoubleClick(item);
    if(this.allowItemEditOnDoubleClick()) this.editSelectedItem();
  }



  protected override setWindowMouseDownListener() {
    if (!this.allowListToUnselect()) {
      this.removeWindowMouseDownListener = this.renderer.listen('window', 'mousedown', (() => this.onWindowMouseDown()));
    } else {
      super.setWindowMouseDownListener();
    }
  }



  protected override onEscapeKey(e: KeyboardEvent): void {
    e.preventDefault();
    if (this.itemInEditMode) {
      if (!this._preventEditExit && !this._preventEditExitOnEscapeKey) {
        this.editExitedOnEscapeKeyEvent.emit(this.items().indexOf(this.itemInEditMode));
        this.itemInEditMode.setEditMode(false, true);
        this.itemInEditMode = null!;
      }
    } else {
      super.onEscapeKey(e);
    }
  }



  protected override onEnterKey(e: KeyboardEvent): void {
    e.preventDefault();
    if (this.itemInEditMode) {
      if (!this._preventEditExit && !this._preventEditExitOnEnterKey) {
        this.editExitedOnEnterKeyEvent.emit(this.items().indexOf(this.itemInEditMode));
        this.exitEdit();
      }
    } else {
      super.onEnterKey(e);
    }
  }



  protected override onShiftAndControlKeys(e: KeyboardEvent) {
    if (this.allowMultiselection()) super.onShiftAndControlKeys(e);
  }



  protected override onWindowMouseDown(): void {
    if (this.itemInEditMode) {
      if (!this.itemInEditMode.getItemText()?.stopMouseDownPropagation) {
        if (!this._preventEditExit && !this._preventEditExitOnMouseDown) {
          this.editExitedOnMouseDownEvent.emit(this.items().indexOf(this.itemInEditMode!));
          this.itemInEditMode.stopMouseDownPropagation = false;
          this.exitEdit();
        }
      } else {
        if (this.itemInEditMode.getItemText()) this.itemInEditMode.getItemText().stopMouseDownPropagation = false;
      }
    } else {
      super.onWindowMouseDown();
    }
  }



  public editSelectedItem(): void {
    const currentSelectedItem = this.items().find(item => item.hasPrimarySelection);
    if (currentSelectedItem) {
      this.itemInEditMode = currentSelectedItem;
      this.itemInEditMode.setEditMode(true);
    }
  }



  public exitEdit(): void {
    if (this.itemInEditMode) {
      this.itemInEditMode.setEditMode(false);
      this.itemInEditMode = null!;
    }
  }



  public preventEditExit(value: boolean): void {
    this._preventEditExit = value;
  }



  public preventEditExitOnEnterKey(value: boolean): void {
    this._preventEditExitOnEnterKey = value;
  }



  public preventEditExitOnEscapeKey(value: boolean): void {
    this._preventEditExitOnEscapeKey = value;
  }



  public preventEditExitOnMouseDown(value: boolean): void {
    this._preventEditExitOnMouseDown = value;
  }
}