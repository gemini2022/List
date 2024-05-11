import { Component, ElementRef, Renderer2, inject, input, viewChild } from '@angular/core';

@Component({
  selector: 'list-item-text:not(a)',
  standalone: true,
  imports: [],
  templateUrl: './list-item-text.component.html',
  styleUrl: './list-item-text.component.scss'
})
export class ListItemTextComponent {
  public width = input<number>();
  protected renderer = inject(Renderer2);
  protected htmlTextElement = viewChild<ElementRef<HTMLElement>>('htmlTextElement');


  ngOnInit() {
    if(!this.width() && this.width() !== 0) this.renderer.setStyle(this.htmlTextElement()?.nativeElement.parentElement,'width', '100%');
  }
}