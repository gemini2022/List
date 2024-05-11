import { CommonModule } from '@angular/common';
import { Component, contentChild } from '@angular/core';
import { EditableListItemTextComponent } from '../editable-list-item-text/editable-list-item-text.component';
import { MultiselectableListItemComponent } from 'multiselectable-list';

@Component({
  selector: 'editable-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editable-list-item.component.html',
  styleUrls: ['../../../../list/src/lib/list-item/list-item.component.scss', '../../../../selectable-list/src/lib/selectable-list-item/selectable-list-item.component.scss', '../../../../multiselectable-list/src/lib/multiselectable-list-item/multiselectable-list-item.component.scss', './editable-list-item.component.scss']
})
export class EditableListItemComponent extends MultiselectableListItemComponent {
  public inEditMode: boolean = false;
  private itemText = contentChild(EditableListItemTextComponent);


  public getItemText(): EditableListItemTextComponent {
    return this.itemText()!;
  }



  public setEditMode(inEditMode: boolean, exitOnEscapeKey?: boolean): void {
    this.inEditMode = inEditMode;
    this.itemText()?.setEditMode(inEditMode, exitOnEscapeKey);
  }
}