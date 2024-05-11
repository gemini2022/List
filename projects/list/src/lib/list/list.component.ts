import { Component, ElementRef, contentChildren, effect, input, viewChild } from '@angular/core';
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
  // Inputs
  public width = input<string>();
  public height = input<string>();
  public cursor = input<string>();
  public fontSize = input<string>();
  public itemHeight = input<string>();
  public fontFamily = input<string>();
  public paddingLeft = input<string>();
  public paddingRight = input<string>();
  public hoverVisible = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });

  // Private
  protected items = contentChildren(ListItemComponent);
  protected list = viewChild<ElementRef<HTMLElement>>('list');



  constructor() {
    effect(() => {
      this.items().forEach((item) => {
        this.setItems(item);
      })
    })
  }



  protected setItems(item: ListItemComponent): void {
    if (this.cursor()) item.cursor = this.cursor()!;
    if (this.itemHeight()) item.itemHeight = this.itemHeight()!;
    if (this.paddingLeft()) item.paddingLeft = this.paddingLeft()!;
    if (this.hoverVisible()) item.hoverVisible = this.hoverVisible();
    if (this.paddingRight()) item.paddingRight = this.paddingRight()!;
  }
}