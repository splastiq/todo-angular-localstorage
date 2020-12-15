import { Component } from '@angular/core';
import { faInfoCircle, faPlus, faTimes, faTrash, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Store, Select } from '@ngxs/store';
import * as todoActions from '../store/todo.actions';
import { ITodo } from '../models/todo.model';
import { TodosState } from '../store/todo.state';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.css'],
})

export class TodoListComponent {
	public filter = 'all';
	public faInfoCircle = faInfoCircle;
	public faPlus = faPlus;
	public faTimes = faTimes;
	public faTrash = faTrash;
	public faQuestionCircle = faQuestionCircle;
	public term = '';
	public showInfo = true;

	@Select(TodosState.allTodos)
	public allTodos$: Observable<ITodo[]>;

	@Select(TodosState.lengthOfTodos)
	public lengthOfTodos$: Observable<number>;

	@Select(TodosState.lengthOfCompletedTodos)
	public lengthOfCompletedTodos$: Observable<number>;

	@Select(TodosState.lengthOfUncompletedTodos)
	public lengthOfUncompletedTodos$: Observable<number>;

	@Select(TodosState.persentageOfCompletedTodos)
	public persentageOfCompletedTodos$: Observable<number>;

	constructor( private store$: Store ) { }

	public addItem(title: string): void {
		this.store$.dispatch(new todoActions.CreateTodo(title));
	}

	public doneEdit(title: string, id: string): void {
		this.store$.dispatch(new todoActions.StopEditingTodo(title, id));
	}

	public editItem(id: string): void {
		this.store$.dispatch(new todoActions.EditTodo(id));
	}

	public deleteItem(id: string): void {
		if (!confirm('Are you sure to delete?')) {
			return;
		} 
		this.store$.dispatch(new todoActions.DeleteTodo(id));
	}

	public deleteCompleted(): void {		
		if (!confirm('Are you sure to delete all completed items?')) {
			return;
		} 
		this.store$.dispatch(new todoActions.DeleteCompletedTodos());
	}

	public completeItem(id: string): void {
		this.store$.dispatch(new todoActions.CompleteTodo(id));
	}

	public toggleVisibleInfoOnClick() {
		this.showInfo = !this.showInfo;
	}
}
