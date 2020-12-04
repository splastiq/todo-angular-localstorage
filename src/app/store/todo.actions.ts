export enum TodoActionsType {
	CreateTodo = '[TODO] create todo item',
	DeleteTodo = '[TODO] delete todo item',
	CompleteTodo = '[TODO] complete todo item',
	EditTodo = '[TODO] edit todo item',
	StopEditingTodo = '[TODO] stop editing todo item',
	DeleteCompletedTodos = '[TODO] delete completed todo items',
}

export class CreateTodo {
	public static readonly type = TodoActionsType.CreateTodo;
	constructor(public title: string) { }
}

export class DeleteTodo {
	public static readonly type = TodoActionsType.DeleteTodo;
	constructor(public id: string) { }
}

export class CompleteTodo {
	public static readonly type = TodoActionsType.CompleteTodo;
	constructor(public id: string) { }
}

export class EditTodo {
	public static readonly type = TodoActionsType.EditTodo;
	constructor(public id: string) { }
}

export class StopEditingTodo {
	public static readonly type = TodoActionsType.StopEditingTodo;
	constructor(public title: string, public id: string) { }
}

export class DeleteCompletedTodos {
	public static readonly type = TodoActionsType.DeleteCompletedTodos;
}
