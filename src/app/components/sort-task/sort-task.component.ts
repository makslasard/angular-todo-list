import { Component } from "@angular/core";
import { TaskService } from "../../services/task.sevice";

@Component({
  selector: "app-sort-task",
  templateUrl: "./sort-task.component.html",
  styleUrls: ["./sort-task.component.scss"],
})
export class SortTaskComponent {
  constructor(public taskService: TaskService) {}

  onChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    switch (selectedValue) {
      case "isImportant":
        this.taskService.sortTask(selectedValue);
        break;

      case "isCompleted":
        this.taskService.sortTask(selectedValue);
        break;

      default:
        this.taskService.getAllTask(); // Use plural for consistency
    }
  }
}
