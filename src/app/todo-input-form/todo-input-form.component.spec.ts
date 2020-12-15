import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoInputFormComponent } from './todo-input-form.component';

describe('TodoInputFormComponent', () => {
  let component: TodoInputFormComponent;
  let fixture: ComponentFixture<TodoInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoInputFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('testing form input value', () => {
    const testValue = 'test value';
    component.form.controls['title'].setValue(testValue);
    expect(component.form.value.title).toBe(testValue);
})
});
