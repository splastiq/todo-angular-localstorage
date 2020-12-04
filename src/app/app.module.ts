import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { HeaderComponent } from './header/header.component';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodosState } from './store/todo.state';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		CommonModule,
		FontAwesomeModule,
		NgxsModule.forRoot([TodosState], { developmentMode: !environment.production }),
	],
	declarations: [AppComponent, TodoListComponent, TodoItemComponent, HeaderComponent],
	bootstrap: [AppComponent],
	providers: [AppComponent],
})
export class AppModule { }
