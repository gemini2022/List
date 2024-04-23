import { Component } from '@angular/core';
import { MultiselectableListBase } from '../multiselectable-list-base';
import { MultiselectableListItemComponent } from '../multiselectable-list-item/multiselectable-list-item.component';

@Component({
  selector: 'multiselectable-list',
  standalone: true,
  imports: [],
  templateUrl: './multiselectable-list.component.html',
  styleUrl: './multiselectable-list.component.scss'
})
export class MultiselectableListComponent extends MultiselectableListBase<MultiselectableListItemComponent> {

}