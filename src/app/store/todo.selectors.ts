import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState, TODO_REDUCER_NODE } from './todo.reducer';

export const todoFeatureSelector = createFeatureSelector<TodoState>(TODO_REDUCER_NODE);

export const todoListSelector = createSelector(
    todoFeatureSelector,
    state => state.todoList
);
