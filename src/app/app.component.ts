import { Component, OnInit } from "@angular/core";
import { DataService } from "./data.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  form: FormGroup;
  filter: string;
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      title: ""
    });
  }

  ngOnInit() {
    this.filter = 'all';
  }

  get getItems() {
    switch (this.filter) {
      case 'completed': return this.dataService.getItems.filter((item) => item.done === true); break;
      case 'uncompleted': return this.dataService.getItems.filter((item) => item.done === false); break;
      default: return this.dataService.getItems; break;
    }
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

  test() {
    console.log('test');
  }

  showAll() {
    this.filter = 'all';
  }

  showCompleted() {
    this.filter = 'completed';
  }
}
