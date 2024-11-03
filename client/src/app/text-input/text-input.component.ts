import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [],
  template: `<input #textInput type="text" class="textInput active" (keyup.enter)="enterClicked($event)">`,
  styles: ''
})
export class TextInputComponent implements AfterViewInit {
  @ViewChild('textInput') textInput !: ElementRef;
  ngAfterViewInit(): void {
    this.textInput.nativeElement.focus();
  }
  @Output() itemAdded = new EventEmitter<string>();
  enterClicked(event: Event): void {
    let target = event.target as HTMLInputElement;
    this.itemAdded.emit(this.textInput.nativeElement.value);
    target.value = '';
  }
}
