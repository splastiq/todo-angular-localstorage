import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-input-form',
  templateUrl: './todo-input-form.component.html',
  styleUrls: ['./todo-input-form.component.css']
})
export class TodoInputFormComponent {
  public form: FormGroup;
	public faPlus = faPlus;
  
  constructor(
		private formBuilder: FormBuilder,
	) {
		this.form = this.formBuilder.group({
			title: ['', [Validators.required, Validators.minLength(2)]],
		});
	}

  @Output() public addItemOnSubmit = new EventEmitter();

  public addItem(): void {
    const title = this.form.value.title;
    if (!title || title.trim().length === 0) {
			this.form.reset();
			return;
		}
    this.addItemOnSubmit.emit(title.trim());
    this.form.reset();
	}

}
