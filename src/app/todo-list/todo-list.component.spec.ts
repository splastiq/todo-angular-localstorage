import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoListComponent } from './todo-list.component';
import { NgxsModule, Store } from '@ngxs/store';
import { FilterPipe } from '../pipes/filter.pipe';

describe('Testing TodoListComponent', () => {

    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;
    let store: Store;

    beforeEach(() => {
        TestBed
            .configureTestingModule({
                declarations: [TodoListComponent, FilterPipe],
                imports: [
                    FontAwesomeModule,
                    [NgxsModule.forRoot([])],
                ],
            })
            .compileComponents();

        store = TestBed.inject(Store);
        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});