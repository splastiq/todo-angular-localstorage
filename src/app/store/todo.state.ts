import { State, Action } from '@ngxs/store';
import * as todoActions from './todo.actions';
import { v4 as uuid } from 'uuid';
import { ITodo } from '../models/todo.model';

const initialState = localStorage.getItem('state')
		? JSON.parse(localStorage.getItem('state'))
		: { todoList: [] };

const saveInLocalStorage = (state: ITodo[]): void => {
	localStorage.setItem('state', JSON.stringify(state));
};

@State({
	name: 'myTodos',
	defaults: initialState,
})

export class TodosState {
	@Action(todoActions.CreateTodo)
	// tslint:disable-next-line: typedef
	private createTodo({ getState, setState }, payload: any) {
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
	// tslint:disable-next-line: typedef
	private deleteTodo({ getState, setState }, payload: any) {
		const state = getState();
		const newState = {
			...state, todoList: state.todoList.filter((item: ITodo) => item.id !== payload.id),
		};
		saveInLocalStorage(newState);
		setState(newState);
	}

	@Action(todoActions.CompleteTodo)
	// tslint:disable-next-line: typedef
	private completeTodo({ getState, setState }, payload: any) {
		const state = getState();
		const newState = {
			...state, todoList: state.todoList.map((item: ITodo) => item.id === payload.id ? { ...item, done: !item.done } : item),
		};
		saveInLocalStorage(newState);
		setState(newState);
	}

	@Action(todoActions.EditTodo)
	// tslint:disable-next-line: typedef
	private editTodo({ getState, setState }, payload: any) {
		const state = getState();
		const newState = {
			...state, todoList: state.todoList.map((item: ITodo) => item.id === payload.id ? { ...item, edit: true } : item),
		};
		saveInLocalStorage(newState);
		setState(newState);
	}

	@Action(todoActions.StopEditingTodo)
	// tslint:disable-next-line: typedef
	private stopEditingTodo({ getState, setState }, payload: any) {
		const state = getState();
		const newState = {
			...state, todoList: state.todoList.map((item: ITodo) =>
				item.id === payload.id ? { ...item, edit: false, title: payload.title } : item),
		};
		saveInLocalStorage(newState);
		setState(newState);
	}

	@Action(todoActions.DeleteCompletedTodos)
	// tslint:disable-next-line: typedef
	private deleteCompletedTodos({ getState, setState }, payload: any) {
		const state = getState();
		const newState = {
			...state, todoList: state.todoList.filter((item: ITodo) => !item.done),
		};
		saveInLocalStorage(newState);
		setState(newState);
	}
}
