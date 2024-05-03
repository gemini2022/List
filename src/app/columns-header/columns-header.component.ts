import { Component, contentChildren, output } from '@angular/core';
import { ResizableHeaderColumnComponent } from '../resizable-header-column/resizable-header-column.component';

@Component({
  selector: 'columns-header',
  standalone: true,
  imports: [],
  templateUrl: './columns-header.component.html',
  styleUrl: './columns-header.component.scss'
})
export class ColumnsHeaderComponent {
  public showResizeOverlay = output<boolean>();
  private headerColumns = contentChildren(ResizableHeaderColumnComponent);


  private ngOnInit(): void {
    this.headerColumns().forEach((headerColumn, i, previousHeaderColumns) => {
      headerColumn.showResizeOverlay.subscribe((show: boolean)=> this.showResizeOverlay.emit(show));
      if(i === 0) {
        headerColumn.setLeftPos(10);
      }else {
        headerColumn.setLeftPos(previousHeaderColumns[i-1].getLeft() + parseFloat(previousHeaderColumns[i-1].initialWidth()));
      }
    })
  }
}