import { Component } from "@angular/core";
import { DataService } from "./data.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  form: FormGroup;
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      title: ""
    });
  }

  getItems() {
    return this.dataService.getItems;
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
}
