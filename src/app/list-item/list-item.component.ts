import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  public cursor!: string;
  public itemHeight!: string;
  public paddingLeft!: string;
  public paddingRight!: string;
  public verticalOverflow!: string;
  public hoverVisible: boolean = false;
}