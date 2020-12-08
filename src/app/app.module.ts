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
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		CommonModule,
		AutofocusFixModule.forRoot(),
		FontAwesomeModule,
		NgxsModule.forRoot([TodosState], { developmentMode: !environment.production }),
		NgxsReduxDevtoolsPluginModule.forRoot(),
	],
	declarations: [
		AppComponent,
		TodoListComponent,
		TodoItemComponent,
		HeaderComponent,
		FilterPipe,
	],
	bootstrap: [AppComponent],
	providers: [AppComponent],
})
export class AppModule { }
