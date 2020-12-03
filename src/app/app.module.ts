import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { HeaderComponent } from './header/header.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreModule } from '@ngrx/store';
import { todoReducer, TODO_REDUCER_NODE } from './store/todo.reducer';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		StoreModule.forRoot({}, {}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
		StoreModule.forFeature(TODO_REDUCER_NODE, todoReducer),
		CommonModule,
		FontAwesomeModule,
	],
	declarations: [AppComponent, TodoListComponent, TodoItemComponent, HeaderComponent],
	bootstrap: [AppComponent],
	providers: [AppComponent],
})
export class AppModule { }
