import { todoActionsType } from './todo.actions';
import { v4 as uuid } from 'uuid';

export const TODO_REDUCER_NODE = 'todo_state';

export interface TodoState {
    todoList: [];
}

class Item {
    title: string;
    done?: boolean;
    id?: string;
    edit?: boolean;

    constructor(title: string) {
        this.title = title,
        this.done = false,
        this.id = uuid(),
        this.edit = false;
    }
}

const initialState: TodoState = {
    todoList: localStorage.getItem('state')
        ? JSON.parse(localStorage.getItem('state'))
        : []
};

const saveInLocalStorage = (state): void => {
    localStorage.setItem('state', JSON.stringify(state));
};

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case todoActionsType.create: {
            const tempState = {
                ...state, todoList: [
                    ...state.todoList,
                    new Item(action.payload.title)
                ]
            };
            saveInLocalStorage(tempState.todoList);
            return tempState;
        }
        case todoActionsType.delete: {
            const tempState = {
                ...state, todoList: state.todoList.filter((item: Item) => item.id !== action.payload.id)
            };
            saveInLocalStorage(tempState.todoList);
            return tempState;
        }
        case todoActionsType.complete: {
            const tempState = {
                ...state, todoList: state.todoList.map((item: Item) => item.id === action.payload.id ? { ...item, done: !item.done } : item)
            };
            saveInLocalStorage(tempState.todoList);
            return tempState;
        }
        case todoActionsType.edit: {
            const tempState = {
                ...state, todoList: state.todoList.map((item: Item) => item.id === action.payload.id ? { ...item, edit: true } : item)
            };
            saveInLocalStorage(tempState.todoList);
            return tempState;
        }
        case todoActionsType.stopEditing: {
            const tempState = {
                ...state, todoList: state.todoList.map((item: Item) =>
                    item.id === action.payload.id ? { ...item, edit: false, title: action.payload.title } : item)
            };
            saveInLocalStorage(tempState.todoList);
            return tempState;
        }
        case todoActionsType.deleteCompleted: {
            const tempState = {
                ...state, todoList: state.todoList.filter((item: Item) => !item.done)
            };
            saveInLocalStorage(tempState.todoList);
            return tempState;
        }
        default:
            return state;
    }
};
