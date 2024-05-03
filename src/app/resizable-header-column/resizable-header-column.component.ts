import { Component, input, output, signal, viewChild } from '@angular/core';
import { ColumnResizerDirective } from '../column-resizer-directive/column-resizer.directive';

@Component({
  selector: 'resizable-header-column',
  standalone: true,
  imports: [ColumnResizerDirective],
  templateUrl: './resizable-header-column.component.html',
  styleUrl: './resizable-header-column.component.scss'
})
export class ResizableHeaderColumnComponent {
  protected left!: number;
  public initialWidth = input('0');
  private columnResizer = viewChild(ColumnResizerDirective);
  public showResizeOverlay = output<boolean>();
  public width = signal(0);


  private ngOnInit(): void {
    this.columnResizer()?.widthChangedEvent.subscribe((width: number)=> this.width.set(width));
    this.columnResizer()?.showResizeOverlay.subscribe((show: boolean) => this.showResizeOverlay.emit(show));
  }



  public setLeftPos(left: number): void {
    this.left = left;
  }



  public getLeft(): number {
    return this.left;
  }



  protected getWidth(): number {
    return parseFloat(this.initialWidth());
  }
}