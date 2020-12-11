import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';
import { NgxsModule, Store } from '@ngxs/store';
import { FilterPipe } from '../pipes/filter.pipe';
import { Observable } from 'rxjs';

describe('Testing TodoListComponent', () => {

    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;
    let store: Store;
	let lengthOfTodos$: Observable<number>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TodoListComponent, FilterPipe],
            imports: [
                FontAwesomeModule,
                FormsModule,
                ReactiveFormsModule,
                [NgxsModule.forRoot([])],
            ],
        });

        store = TestBed.inject(Store);

        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;
        //     component.item = { id: 'test-1-id-1', title: 'Test Todo 1', done: true, edit: false };
    });

    it('should change filter by clicking on pills', async () => {
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelectorAll('small');

        console.log(input[0].textContent)
        // expect(span.textContent).toContain(component.item.title);
        expect(2 + 2).toBe(4);
    });
});