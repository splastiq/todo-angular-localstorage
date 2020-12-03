import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  title = '';
  faTimes = faTimes;
  faPen = faPen;

  @Input() item: Todo;
  @Output() saveState = new EventEmitter();
  @Output() editingItem = new EventEmitter();
  @Output() doneEditing = new EventEmitter();
  @Output() deletingIteam = new EventEmitter();
  @Output() completingIteam = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.title = this.item.title;
  }

  editItem(id: string): void {
    this.editingItem.emit(id);
  }

  doneEdit(): void {
    this.doneEditing.emit(this.title);
  }

  deleteItem(id: string): void {
    this.deletingIteam.emit(id);
  }

  completeItem(id: string): void {
    this.completingIteam.emit(id);
  }

}
