import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() item;
  @Output() saveState = new EventEmitter();
  @Output() editingItem = new EventEmitter();
  @Output() doneEditing = new EventEmitter();
  @Output() deletingIteam = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  save(): void {
    this.saveState.emit();
  }

  editItem(item): void {
    this.editingItem.emit(item);
  }

  doneEdit(item): void {
    this.doneEditing.emit(item);
  }

  deleteItem(id): void {
    this.deletingIteam.emit(id);
  }

}
