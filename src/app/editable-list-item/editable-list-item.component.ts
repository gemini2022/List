import { CommonModule } from '@angular/common';
import { Component, contentChild } from '@angular/core';
import { MultiselectableListItemComponent } from '../multiselectable-list-item/multiselectable-list-item.component';
import { EditableListItemTextComponent } from '../editable-list-item-text/editable-list-item-text.component';

@Component({
  selector: 'editable-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editable-list-item.component.html',
  styleUrls: ['./../list-item/list-item.component.scss', './../selectable-list-item/selectable-list-item.component.scss', './../multiselectable-list-item/multiselectable-list-item.component.scss', './editable-list-item.component.scss']
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