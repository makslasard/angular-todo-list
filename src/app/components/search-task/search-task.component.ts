import { Component } from "@angular/core";
import { TaskService } from "../../services/task.sevice";

@Component({
  selector: "app-search-task",
  templateUrl: "./search-task.component.html",
  styleUrls: ["./search-task.component.scss"],
})
export class SearchTaskComponent {
  searchQuery = "";

  constructor(public taskService: TaskService) {}

  onChange() {
    console.log(this.searchQuery);
    this.taskService.searchTask(this.searchQuery);
  }
}
