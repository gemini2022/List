import { Component, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListItemTextComponent } from './list-item-text/list-item-text.component';
import { SelectableListComponent } from './selectable-list/selectable-list.component';
import { SelectableListItemComponent } from './selectable-list-item/selectable-list-item.component';
import { MultiselectableListComponent } from './multiselectable-list/multiselectable-list.component';
import { MultiselectableListItemComponent } from './multiselectable-list-item/multiselectable-list-item.component';
import { EditableListComponent } from './editable-list/editable-list.component';
import { EditableListItemComponent } from './editable-list-item/editable-list-item.component';
import { EditableListItemTextComponent } from './editable-list-item-text/editable-list-item-text.component';
import { ColumnsHeaderComponent } from './columns-header/columns-header.component';
import { ResizableHeaderColumnComponent } from './resizable-header-column/resizable-header-column.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ListComponent,
    ListItemComponent,
    ListItemTextComponent,
    SelectableListComponent,
    SelectableListItemComponent,
    MultiselectableListComponent,
    MultiselectableListItemComponent,
    EditableListComponent,
    EditableListItemComponent,
    EditableListItemTextComponent,
    ColumnsHeaderComponent,
    ResizableHeaderColumnComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected listComponent = viewChild(EditableListComponent);
  protected list: Array<string> = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6', 'Item7 sdfds sdfsdf ddtdr werwerwe werwer rtyrttr erterwer werwe', 'Item8', 'Item9', 'Item10', 'Item11', 'Item12', 'Item13', 'Item14', 'Item15', 'Item16', 'Item17', 'Item18', 'Item19', 'Item20']


  ngOnInit() {
    // setTimeout(() => {
    //   console.log('go')
    //   this.listComponent()?.preventEditExit(true)
    // }, 5000);
    
  }



  EditItem() {
    // this.listComponent()?.preventListFromUnselectingOnMouseDown(true);
    // this.list.push('trumpy')
  }


  
}