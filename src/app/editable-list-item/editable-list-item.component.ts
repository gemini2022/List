import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MultiselectableListItemComponent } from '../multiselectable-list-item/multiselectable-list-item.component';

@Component({
  selector: 'editable-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editable-list-item.component.html',
  styleUrls: ['./../list-item/list-item.component.scss', './../selectable-list-item/selectable-list-item.component.scss', './../multiselectable-list-item/multiselectable-list-item.component.scss', './editable-list-item.component.scss']
})
export class EditableListItemComponent extends MultiselectableListItemComponent {
  public inEditMode: boolean = false;


  protected override onItemDown(e: MouseEvent) {
    if (!this.inEditMode) super.onItemDown(e);
  }



  // public exitEditMode(exitEditOnEscape: boolean): void {
  //   if (this.htmlElement()!.nativeElement.innerText.trim().length > 0) {
  //     exitEditOnEscape ? this.cancelItemEdit() : this.completeItemEdit();
  //   } else if (exitEditOnEscape) {
  //     this.cancelItemEdit();
  //   }
  // }



  // private cancelItemEdit(): void {

  // }



  // private completeItemEdit(): void {

  // }
}