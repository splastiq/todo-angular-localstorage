import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import { ITodo } from '../models/todo.model';

@Component({
	selector: 'app-todo-item',
	templateUrl: './todo-item.component.html',
	styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
	public title = '';
	public faTimes = faTimes;
	public faPen = faPen;

	@Input() public item: ITodo;
	@Output() public saveState = new EventEmitter();
	@Output() public editingItem = new EventEmitter();
	@Output() public doneEditing = new EventEmitter();
	@Output() public deletingIteam = new EventEmitter();
	@Output() public completingIteam = new EventEmitter();

	public ngOnInit(): void {
		this.title = this.item.title;
	}

	public editItem(id: string): void {
		this.editingItem.emit(id);
	}

	public doneEdit(): void {
		this.doneEditing.emit(this.title);
	}

	public deleteItem(id: string): void {
		this.deletingIteam.emit(id);
	}

	public completeItem(id: string): void {
		this.completingIteam.emit(id);
	}

}
