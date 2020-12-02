import { Action } from '@ngrx/store';

export enum todoActionsType {
    create = '[TODO] create todo item',
    delete = '[TODO] delete todo item',
    complete = '[TODO] complete todo item',
    edit = '[TODO] edit todo item',
    stopEditing = '[TODO] stop editing todo item',
    deleteCompleted = '[TODO] delete completed todo items',
}

export class TodoCreateAction implements Action {
    readonly type = todoActionsType.create;
    constructor(public payload: { title: string }) { }
}

export class TodoDeleteAction implements Action {
    readonly type = todoActionsType.delete;
    constructor(public payload: { id: string }) { }
}

export class TodoCompleteAction implements Action {
    readonly type = todoActionsType.complete;
    constructor(public payload: { id: string }) { }
}

export class TodoEditAction implements Action {
    readonly type = todoActionsType.edit;
    constructor(public payload: { id: string }) { }
}

export class TodoStopEditingAction implements Action {
    readonly type = todoActionsType.stopEditing;
    constructor(public payload: { title: string, id: string }) { }
}

export class TodoDeleteCompletedAction implements Action {
    readonly type = todoActionsType.deleteCompleted;
}

export type todoActions =
    TodoCreateAction |
    TodoDeleteAction |
    TodoCompleteAction |
    TodoEditAction |
    TodoStopEditingAction |
    TodoDeleteCompletedAction;
