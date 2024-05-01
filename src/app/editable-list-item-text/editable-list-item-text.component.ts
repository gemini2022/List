import { CommonModule } from '@angular/common';
import { Component, ElementRef, OutputRefSubscription, Renderer2, inject, output, viewChild } from '@angular/core';
import { PasteDirective } from '../paste-directive/paste.directive';

@Component({
  selector: 'editable-list-item-text',
  standalone: true,
  imports: [CommonModule, PasteDirective],
  templateUrl: './editable-list-item-text.component.html',
  styleUrls: ['./../list-item-text/list-item-text.component.scss', './editable-list-item-text.component.scss']
})
export class EditableListItemTextComponent {
  public editExitedEvent = output();
  public rightClickedEvent = output();
  private textValueBeforeEdit!: string;
  private renderer = inject(Renderer2);
  protected inEditMode: boolean = false;
  protected inAlertMode: boolean = false;
  public inputedEvent = output<string>();
  private removeMouseDownListener!: () => void;
  public stopMouseDownPropagation: boolean = false;
  public stopRightClickPropagation: boolean = false;
  public inputSubscription!: OutputRefSubscription;
  public rightClickSubscription!: OutputRefSubscription;
  private htmlTextElement = viewChild<ElementRef<HTMLElement>>('htmlTextElement');


  public setEditMode(inEditMode: boolean, exitOnEscapeKey?: boolean): void {
    this.inEditMode = inEditMode;
    if (this.inEditMode) {
      this.enterEditMode();
    } else {
      this.exitEditMode(exitOnEscapeKey);
    }
  }



  private enterEditMode(): void {
    this.setFocus();
    this.textValueBeforeEdit = this.htmlTextElement()!.nativeElement.innerText.trim();
    this.removeMouseDownListener = this.renderer.listen(this.htmlTextElement()?.nativeElement, 'mousedown', () => this.stopMouseDownPropagation = true);
  }



  private exitEditMode(exitOnEscapeKey?: boolean): void {
    this.removeMouseDownListener();
    const text = exitOnEscapeKey ? this.textValueBeforeEdit : this.htmlTextElement()!.nativeElement.innerText.trim();
    this.htmlTextElement()!.nativeElement.innerText = '';
    setTimeout(() => {
      this.htmlTextElement()!.nativeElement.innerText = text;
      this.editExitedEvent.emit();
    });
  }



  private setFocus(): void {
    if (this.htmlTextElement()!.nativeElement.firstChild) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(this.htmlTextElement()!.nativeElement.firstChild!);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    setTimeout(() => this.htmlTextElement()?.nativeElement.focus());
  }



  protected onRightClick(): void {
    if (this.inEditMode) {
      this.rightClickedEvent.emit();
      this.stopRightClickPropagation = true;
    }
  }



  private ngOnDestroy(): void {
    this.removeMouseDownListener();
  }
}