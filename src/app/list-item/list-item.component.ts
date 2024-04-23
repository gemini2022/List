import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListItemBase } from '../list-item-base';

@Component({
  selector: 'list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent extends ListItemBase {

}