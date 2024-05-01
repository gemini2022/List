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
    EditableListItemTextComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected listComponent = viewChild(SelectableListComponent);
  protected list: Array<string> = ['Make', 'America', 'Great', 'Again']


  // ngOnInit() {
  //   this.listComponent()?.textInputedEvent.subscribe((text)=> {
  //     console.log(text)
  //   })
  // }



  EditItem() {
    this.listComponent()?.preventListFromUnselectingOnMouseDown(true);
    // this.list.push('trumpy')
  }
}