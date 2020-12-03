import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  title = '';
  faTimes = faTimes;
  faPen = faPen;

  @Input() item;
  @Output() saveState = new EventEmitter();
  @Output() editingItem = new EventEmitter();
  @Output() doneEditing = new EventEmitter();
  @Output() deletingIteam = new EventEmitter();
  @Output() completingIteam = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.title = this.item.title;
  }

  editItem(item): void {
    this.editingItem.emit(item);
  }

  doneEdit(): void {
    this.doneEditing.emit(this.title);
  }

  deleteItem(id): void {
    this.deletingIteam.emit(id);
  }

  completeItem(id): void {
    this.completingIteam.emit(id);
  }

}
