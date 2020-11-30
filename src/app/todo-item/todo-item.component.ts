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

  save() {
    this.saveState.emit();
  }

  editItem(item) {
    this.editingItem.emit(item);
  }

  doneEdit(item) {
    this.doneEditing.emit(item);
  }

  deleteItem(id) {
    this.deletingIteam.emit(id);
  }

}
