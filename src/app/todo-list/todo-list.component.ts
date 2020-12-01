import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  form: FormGroup;
  filter: Filter = Filter.all;
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      title: ''
    });
  }

  ngOnInit(): void {
    this.filter = Filter.all;
  }

  get items(): Array<any> {
    return this.dataService.getItems.filter(filtersMap[this.filter]);
  }

  addItem(): void {
    if (this.form.value.title.trim().length === 0) {
      this.form.reset();
      return;
    }
    this.dataService.addItem(this.form.value.title.trim());
    this.form.reset();
  }

  doneEdit(item: { edit: boolean }): void {
    this.dataService.doneEdit(item);
  }

  editItem(item: { edit: boolean }): void  {
    this.dataService.editItem(item);
  }

  deleteItem(id: string): void  {
    this.dataService.deleteItem(id);
  }

  deleteCompleted(): void  {
    this.dataService.deleteCompleted();
  }

  completeItem(item: { done: boolean }): void  {
    this.dataService.completeItem(item);
  }

  save(): void  {
    this.dataService.save();
  }

  get getPersentageOfDoneItems(): number {
    return this.dataService.getLengthOfDoneItems / this.dataService.getItemsLength;
  }

  get getDoneItemsLength(): number {
    return this.dataService.getLengthOfDoneItems;
  }

  get getItemsLength(): number {
    return this.dataService.getItemsLength;
  }
}
