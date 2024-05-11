import { Component, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditableListComponent, EditableListItemComponent, EditableListItemTextComponent } from 'editable-list';
import { ListComponent, ListItemComponent, ListItemTextComponent } from 'list';
import { MultiselectableListComponent, MultiselectableListItemComponent } from 'multiselectable-list';
import { SelectableListComponent, SelectableListItemComponent } from 'selectable-list';

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