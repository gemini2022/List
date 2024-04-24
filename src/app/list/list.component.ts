import { Component, contentChildren, effect, input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public width = input<string>();
  public height = input<string>();
  public cursor = input<string>();
  public indent = input<string>();
  public fontSize = input<string>();
  public itemHeight = input<string>();
  public fontFamily = input<string>();
  protected items = contentChildren(ListItemComponent);
  public hoverVisible = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });


  constructor() {
    effect(() => {
      if (this.cursor() || this.indent() || this.itemHeight() || this.hoverVisible()) {
        this.items().forEach((item) => {
          if (this.cursor()) item.cursor = this.cursor()!;
          if (this.indent()) item.indent = this.indent()!;
          if (this.itemHeight()) item.itemHeight = this.itemHeight()!;
          if (this.hoverVisible()) item.hoverVisible = this.hoverVisible();
        })
      }
    })
  }
}