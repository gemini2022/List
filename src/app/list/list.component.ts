import { Component } from '@angular/core';
import { ListBase } from '../list-base';

@Component({
  selector: 'list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends ListBase {
  
}