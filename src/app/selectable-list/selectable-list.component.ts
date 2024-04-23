import { Component } from '@angular/core';
import { SelectableListBase } from '../selectable-list-base';
import { SelectableListItemComponent } from '../selectable-list-item/selectable-list-item.component';

@Component({
  selector: 'selectable-list',
  standalone: true,
  imports: [],
  templateUrl: './selectable-list.component.html',
  styleUrl: './selectable-list.component.scss'
})
export class SelectableListComponent extends SelectableListBase<SelectableListItemComponent> {

}