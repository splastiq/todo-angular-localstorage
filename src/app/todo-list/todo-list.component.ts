import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { FormBuilder, FormGroup } from "@angular/forms";

enum Filter {
  all = 'all',
  comp = 'completed',
  uncomp = 'uncompleted'
}

const filtersMap = {
  [Filter.all]: () => true,
  [Filter.comp]: item => item.done,
  [Filter.uncomp]: item => !item.done
}

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
      title: ""
    });
  }

  ngOnInit() {
    this.filter = Filter.all;
  }

  get items() {
    return this.dataService.getItems.filter(filtersMap[this.filter])
  }

  addItem() {
    if (this.form.value.title.trim().length === 0) {
      this.form.reset();
      return;
    }
    this.dataService.addItem(this.form.value.title.trim());
    this.form.reset();
  }

  doneEdit(item: { edit: boolean }) {
    this.dataService.doneEdit(item);
  }

  editItem(item: { edit: boolean }) {
    this.dataService.editItem(item);
  }

  deleteItem(id: string) {
    this.dataService.deleteItem(id);
  }

  deleteCompleted() {
    this.dataService.deleteCompleted();
  }

  completeItem(item: { done: boolean }) {
    this.dataService.completeItem(item);
  }

  save() {
    this.dataService.save();
  }

  get getPersentageOfDoneItems() {
    return this.dataService.getLengthOfDoneItems / this.dataService.getItemsLength;
  }

  get getDoneItemsLength() {
    return this.dataService.getLengthOfDoneItems;
  }

  get getItemsLength() {
    return this.dataService.getItemsLength;
  }
}
