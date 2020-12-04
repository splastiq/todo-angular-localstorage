import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store, Select } from '@ngxs/store';
import * as todoActions from '../store/todo.actions';
import { ITodo } from '../models/todo.model';
import { TodosState } from '../store/todo.state';
import { Observable } from 'rxjs';

enum Filter {
	all = 'all',
	comp = 'completed',
	uncomp = 'uncompleted',
}

const filtersMap = {
	[Filter.all]: () => true,
	[Filter.comp]: (item: ITodo) => item.done,
	[Filter.uncomp]: (item: ITodo) => !item.done,
};

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.css'],
})

export class TodoListComponent implements OnInit {
	public countOfTodoItems: number;
	public countOfCompletedTodoItems: number;
	public form: FormGroup;
	public filter: Filter = Filter.all;
	public todoItems: ITodo[];
	public faInfoCircle = faInfoCircle;
	public faPlus = faPlus;

	// @Select(TodosState) public count$: Observable<number>;

	constructor(
		private formBuilder: FormBuilder,
		private store$: Store,
	) {
		this.form = this.formBuilder.group({
			title: '',
		});
	}

	public ngOnInit(): void {

		this.store$.subscribe(state => {
			this.todoItems = state.myTodos.todoList;
			this.countOfTodoItems = this.todoItems.length;
			this.countOfCompletedTodoItems = this.todoItems.filter((item: ITodo) => item.done).length;
		});
	}

	get todos(): ITodo[] {
		return this.todoItems.filter(filtersMap[this.filter]);
	}

	public addItem(): void {
		const title = this.form.value.title;
		if (!title || title.trim().length === 0) {
			this.form.reset();
			return;
		}
		this.store$.dispatch(new todoActions.CreateTodo(title.trim()));
		this.form.reset();
	}

	public doneEdit(title: string, id: string): void {
		this.store$.dispatch(new todoActions.StopEditingTodo(title, id));
	}

	public editItem(id: string): void {
		this.store$.dispatch(new todoActions.EditTodo(id));
	}

	public deleteItem(id: string): void {
		this.store$.dispatch(new todoActions.DeleteTodo(id));
	}

	public deleteCompleted(): void {
		this.store$.dispatch(new todoActions.DeleteCompletedTodos());
	}

	public completeItem(id: string): void {
		this.store$.dispatch(new todoActions.CompleteTodo(id));
	}
}
