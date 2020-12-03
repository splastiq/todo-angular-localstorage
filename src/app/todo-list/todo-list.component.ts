import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { filter, map } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as todoActions from '../store/todo.actions';

import { todoListSelector } from '../store/todo.selectors';
import { faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

enum Filter {
  all = 'all',
  comp = 'completed',
  uncomp = 'uncompleted'
}

const filtersMap = {
  [Filter.all]: () => true,
  [Filter.comp]: item => item.done,
  [Filter.uncomp]: item => !item.done
};

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  countOfTodoItems: number;
  countOfCompletedTodoItems: number;
  form: FormGroup;
  filter: Filter = Filter.all;
  todoItems;
  // todoItems$;
  faInfoCircle = faInfoCircle;
  faPlus = faPlus;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store
  ) {
    this.form = this.formBuilder.group({
      title: ''
    });
  }

  ngOnInit(): void {

    // this.todoItems$ = this.store$.pipe(
    //   select(todoListSelector),
    //   map(arr => arr.filter(filtersMap[this.filter]))
    // );

    this.store$.pipe(select(todoListSelector)).subscribe(todos => {
      this.todoItems = todos;
      this.countOfTodoItems = todos.length;
      this.countOfCompletedTodoItems = todos.filter((item: any) => item.done).length;
    });
  }

  get todos(): any[] {
    return this.todoItems.filter(filtersMap[this.filter]);
  }

  addItem(): void {
    if (this.form.value.title.trim().length === 0) {
      this.form.reset();
      return;
    }
    this.store$.dispatch(todoActions.createTodo({ title: this.form.value.title.trim() }));
    this.form.reset();
  }

  doneEdit(title: string, id: string): void {
    this.store$.dispatch(todoActions.stopEditingTodo({ title, id }));
  }

  editItem(id: string): void {
    this.store$.dispatch(todoActions.editTodo({ id }));
  }

  deleteItem(id: string): void {
    this.store$.dispatch(todoActions.deleteTodo({ id }));
  }

  deleteCompleted(): void {
    this.store$.dispatch(todoActions.deleteCompletedTodos());
  }

  completeItem(id: string): void {
    this.store$.dispatch(todoActions.completeTodo({ id }));
  }
}
