import { createReducer, on } from '@ngrx/store';
import * as todoActions from './todo.actions';
import { ITodo } from '../models/todo.model';
import { v4 as uuid } from 'uuid';

export const TODO_REDUCER_NODE = 'todo_state';

export interface ITodoState {
	todoList: ITodo[];
}

const initialState: ITodoState = {
	todoList: localStorage.getItem('state')
		? JSON.parse(localStorage.getItem('state'))
		: [],
};

const saveInLocalStorage = (state: ITodo[]): void => {
	localStorage.setItem('state', JSON.stringify(state));
};

export const todoReducer = createReducer(
	initialState,
	on(todoActions.createTodo, (state, action) => {
		const tempState = {
			...state, todoList: [
				...state.todoList,
				{
					title: action.title,
					done: false,
					id: uuid(),
					edit: false,
				},
			],
		};
		saveInLocalStorage(tempState.todoList);
		return tempState;
	}),
	on(todoActions.deleteTodo, (state, action) => {
		const tempState = {
			...state, todoList: state.todoList.filter((item: ITodo) => item.id !== action.id),
		};
		saveInLocalStorage(tempState.todoList);
		return tempState;
	}),
	on(todoActions.completeTodo, (state, action) => {
		const tempState = {
			...state, todoList: state.todoList.map((item: ITodo) => item.id === action.id ? { ...item, done: !item.done } : item),
		};
		saveInLocalStorage(tempState.todoList);
		return tempState;
	}),
	on(todoActions.editTodo, (state, action) => {
		const tempState = {
			...state, todoList: state.todoList.map((item: ITodo) => item.id === action.id ? { ...item, edit: true } : item),
		};
		saveInLocalStorage(tempState.todoList);
		return tempState;
	}),
	on(todoActions.stopEditingTodo, (state, action) => {
		const tempState = {
			...state, todoList: state.todoList.map((item: ITodo) =>
				item.id === action.id ? { ...item, edit: false, title: action.title } : item),
		};
		saveInLocalStorage(tempState.todoList);
		return tempState;
	}),
	on(todoActions.deleteCompletedTodos, (state) => {
		const tempState = {
			...state, todoList: state.todoList.filter((item: ITodo) => !item.done),
		};
		saveInLocalStorage(tempState.todoList);
		return tempState;
	}),
);
