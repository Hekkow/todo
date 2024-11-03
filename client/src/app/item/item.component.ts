import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';
import {Item} from '../classes/item';

@Component({
  selector: 'item',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  @Input() item !: Item;
  @ViewChild('editInput') editInput !: ElementRef;
  @ViewChild('text') text !: ElementRef;
  @Output() itemRemoved = new EventEmitter<number>();
  @Output() itemEdited = new EventEmitter<Item>();
  editing = false;
  remove(event: MouseEvent): void {
    this.text.nativeElement.style.opacity = 0.5;
    this.itemRemoved.emit(this.item.itemID);
  }
  edit(event: MouseEvent): void {
    this.editing = true;
    setTimeout(() => {
      this.editInput.nativeElement.focus();
      this.editInput.nativeElement.value = this.item.itemText;
    }, 0);
  }
  editEnterClicked(event: Event): void {
    this.itemEdited.emit({itemID: this.item.itemID, itemText: this.editInput.nativeElement.value})
    this.editing = false;
  }
}
