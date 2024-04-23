import { Component } from '@angular/core';
import { SelectableListItemBase } from '../selectable-list-item-base';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'selectable-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selectable-list-item.component.html',
  styleUrl: './selectable-list-item.component.scss'
})
export class SelectableListItemComponent extends SelectableListItemBase {

}