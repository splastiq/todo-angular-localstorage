import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from "./todo-item.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('Testing TodoItemComponent', () => {

    let component: TodoItemComponent;
    let fixture: ComponentFixture<TodoItemComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TodoItemComponent],
            imports: [
                FontAwesomeModule, 
                FormsModule, 
                ReactiveFormsModule,
            ],
        });
        fixture = TestBed.createComponent(TodoItemComponent);
        component = fixture.componentInstance;
        component.item = { id: 'test-1-id-1', title: 'Test Todo 1', done: true, edit: false };
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display title of item', () => {
        fixture.detectChanges();
        const span = fixture.nativeElement.querySelector('.title');
        expect(span.textContent).toContain(component.item.title);
    });

    it('should display editing field when item has "edit: true"', () => {
        component.item = { ...component.item, edit: true };
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('.editTitle');
        expect(!!input).toEqual(true);
    });

    it('should display marked checkbox when item has "done: true"', () => {
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('.checkbox');
        expect(input.checked).toBeTrue();
    });

    it('should display unmarked checkbox when item has "done: false"', () => {
        component.item.done = false;
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('.checkbox');
        expect(input.checked).toBeFalse();
    });
});