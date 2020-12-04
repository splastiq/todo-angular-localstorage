import { State, Action } from '@ngxs/store';
import { Injectable } from '@angular/core';
import * as todoActions from './todo.actions';
import { v4 as uuid } from 'uuid';
import { ITodo } from '../models/todo.model';

export interface ITodoState {
	todoList: ITodo[];
}

const initialState: ITodoState = localStorage.getItem('state')
		? JSON.parse(localStorage.getItem('state'))
		: { todoList: [] };

const saveInLocalStorage = (state: ITodo[]): void => {
	localStorage.setItem('state', JSON.stringify(state));
};

@State({
	name: 'myTodos',
	defaults: initialState,
})

@Injectable()
export class TodosState {
	@Action(todoActions.CreateTodo)
	private createTodo({ getState, setState }: any, payload: ITodo): void {
		const state = getState();
		const newState = {
			...state, todoList: [
				...state.todoList,
				{
					title: payload.title,
					done: false,
					id: uuid(),
					edit: false,
				},
			],
		};
		saveInLocalStorage(newState);
		setState(newState);
	}

	@Action(todoActions.DeleteTodo)
	private deleteTodo({ getState, setState }: any, payload: ITodo): void {
		const state = getState();
		const newState = {
			...state, todoList: state.todoList.filter((item: ITodo) => item.id !== payload.id),
		};
		saveInLocalStorage(newState);
		setState(newState);
	}

	@Action(todoActions.CompleteTodo)
	private completeTodo({ getState, setState }: any, payload: ITodo): void {
		const state = getState();
		const newState = {
			...state, todoList: state.todoList.map((item: ITodo) => item.id === payload.id ? { ...item, done: !item.done } : item),
		};
		saveInLocalStorage(newState);
		setState(newState);
	}

	@Action(todoActions.EditTodo)
	private editTodo({ getState, setState }: any, payload: ITodo): void {
		const state = getState();
		const newState = {
			...state, todoList: state.todoList.map((item: ITodo) => item.id === payload.id ? { ...item, edit: true } : item),
		};
		saveInLocalStorage(newState);
		setState(newState);
	}

	@Action(todoActions.StopEditingTodo)
	private stopEditingTodo({ getState, setState }: any, payload: ITodo): void {
		const state = getState();
		const newState = {
			...state, todoList: state.todoList.map((item: ITodo) =>
				item.id === payload.id ? { ...item, edit: false, title: payload.title } : item),
		};
		saveInLocalStorage(newState);
		setState(newState);
	}

	@Action(todoActions.DeleteCompletedTodos)
	private deleteCompletedTodos({ getState, setState }: any): void {
		const state = getState();
		const newState = {
			...state, todoList: state.todoList.filter((item: ITodo) => !item.done),
		};
		saveInLocalStorage(newState);
		setState(newState);
	}
}
