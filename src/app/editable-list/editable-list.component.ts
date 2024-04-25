import { Component, contentChildren, output } from '@angular/core';
import { MultiselectableListComponent } from '../multiselectable-list/multiselectable-list.component';
import { CommonModule } from '@angular/common';
import { EditableListItemComponent } from '../editable-list-item/editable-list-item.component';

@Component({
  selector: 'editable-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editable-list.component.html',
  styleUrls: ['./../list/list.component.scss', './editable-list.component.scss']
})
export class EditableListComponent extends MultiselectableListComponent {
  public enterKeyPressedInEditModeEvent = output<KeyboardEvent>();
  public escapeKeyPressedInEditModeEvent = output<KeyboardEvent>();
  protected override items = contentChildren(EditableListItemComponent);


  public override selectItem(itemIndex: number): void {
    const itemInEditMode = this.items().find(x => x.inEditMode);
    if (itemInEditMode) {
      this.itemSelectedEvent.emit(this.items().indexOf(itemInEditMode));
    } else {
      super.selectItem(itemIndex);
    }
  }



  protected override onKeyDown(e: KeyboardEvent): void {
    super.onKeyDown(e);
    switch (e.key) {
      case 'Escape':
        this.onEscape(e);
        break;
    }
  }



  private onEscape(e: KeyboardEvent): void {
    e.preventDefault();
    const itemInEditMode = this.items().find(x => x.inEditMode);
    if (itemInEditMode) this.escapeKeyPressedInEditModeEvent.emit(e);
  }



  protected override onEnter(e: KeyboardEvent): void {
    e.preventDefault();
    const itemInEditMode = this.items().find(x => x.inEditMode);
    if (itemInEditMode) {
      this.enterKeyPressedInEditModeEvent.emit(e);
    } else {
      super.onEnter(e);
    }
  }



  public editItem(itemIndex: number): void {

  }
}