import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MultiselectableListItemBase } from '../multiselectable-list-item-base';

@Component({
  selector: 'multiselectable-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multiselectable-list-item.component.html',
  styleUrls: ['./multiselectable-list-item.component.scss', './../selectable-list-item/selectable-list-item.component.scss']
})
export class MultiselectableListItemComponent extends MultiselectableListItemBase<MultiselectableListItemComponent>{

}