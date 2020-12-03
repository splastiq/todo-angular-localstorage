import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import * as todoActions from '../store/todo.actions';
import { ITodo } from '../models/todo.model';

import { todoListSelector } from '../store/todo.selectors';
import { faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

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
	// todoItems$;
	public faInfoCircle = faInfoCircle;
	public faPlus = faPlus;

	constructor(
		private formBuilder: FormBuilder,
		private store$: Store,
	) {
		this.form = this.formBuilder.group({
			title: '',
		});
	}

	public ngOnInit(): void {

		// tslint:disable-next-line: no-commented-code
		// this.todoItems$ = this.store$.pipe(
		//   select(todoListSelector),
		//   map(arr => arr.filter(filtersMap[this.filter]))
		// );

		this.store$.pipe(select(todoListSelector)).subscribe(todos => {
			this.todoItems = todos;
			this.countOfTodoItems = todos.length;
			this.countOfCompletedTodoItems = todos.filter((item: ITodo) => item.done).length;
		});
	}

	get todos(): ITodo[] {
		return this.todoItems.filter(filtersMap[this.filter]);
	}

	public addItem(): void {
		if (this.form.value.title.trim().length === 0) {
			this.form.reset();
			return;
		}
		this.store$.dispatch(todoActions.createTodo({ title: this.form.value.title.trim() }));
		this.form.reset();
	}

	public doneEdit(title: string, id: string): void {
		this.store$.dispatch(todoActions.stopEditingTodo({ title, id }));
	}

	public editItem(id: string): void {
		this.store$.dispatch(todoActions.editTodo({ id }));
	}

	public deleteItem(id: string): void {
		this.store$.dispatch(todoActions.deleteTodo({ id }));
	}

	public deleteCompleted(): void {
		this.store$.dispatch(todoActions.deleteCompletedTodos());
	}

	public completeItem(id: string): void {
		this.store$.dispatch(todoActions.completeTodo({ id }));
	}
}
