import { createAction, props } from '@ngrx/store';

export enum todoActionsType {
	createTodo = '[TODO] create todo item',
	deleteTodo = '[TODO] delete todo item',
	completeTodo = '[TODO] complete todo item',
	editTodo = '[TODO] edit todo item',
	stopEditingTodo = '[TODO] stop editing todo item',
	deleteCompletedTodos = '[TODO] delete completed todo items',
}

export const createTodo = createAction(
	todoActionsType.createTodo,
	props<{ title: string }>(),
);

export const deleteTodo = createAction(
	todoActionsType.deleteTodo,
	props<{ id: string }>(),
);

export const completeTodo = createAction(
	todoActionsType.completeTodo,
	props<{ id: string }>(),
);

export const editTodo = createAction(
	todoActionsType.editTodo,
	props<{ id: string }>(),
);

export const stopEditingTodo = createAction(
	todoActionsType.stopEditingTodo,
	props<{ title: string, id: string }>(),
);

export const deleteCompletedTodos = createAction(
	todoActionsType.deleteCompletedTodos,
);
