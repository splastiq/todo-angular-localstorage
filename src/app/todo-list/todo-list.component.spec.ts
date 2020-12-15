import { ComponentFixture, TestBed, async } from '@angular/core/testing';
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
        TestBed
            .configureTestingModule({
                declarations: [TodoListComponent, FilterPipe],
                imports: [
                    FontAwesomeModule,
                    FormsModule,
                    ReactiveFormsModule,
                    [NgxsModule.forRoot([])],
                ],
            })
            .compileComponents();

        store = TestBed.inject(Store);
        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        lengthOfTodos$ = Observable.create((observer) => {
            observer.next(10);
            observer.complete();
        });

        
        //     component.item = { id: 'test-1-id-1', title: 'Test Todo 1', done: true, edit: false };
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('testing form input value', () => {
        const testValue = 'test value';
        component.form.controls['title'].setValue(testValue);
        expect(component.form.value.title).toBe(testValue);
    })

    // it('should change filter by clicking on pills', () => {
    //     const hostElement = fixture.nativeElement

    //     const input = hostElement.querySelector('input');
    //     input.value = 'Test value';
    //     input.dispatchEvent(new Event('Input'));
    // console.log(form.value.title);
    // const subscribe = lengthOfTodos$.subscribe(val => console.log(val));
    // expect(input.textContent).toContain(component.item.title);
    // expect(2 + 2).toBe(4);
    // });
});