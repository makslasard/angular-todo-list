import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TaskService } from "../../services/task.service";

@Component({
  selector: "app-sort-task",
  templateUrl: "./sort-task.component.html",
  styleUrls: ["./sort-task.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortTaskComponent {
  constructor(public taskService: TaskService) {}

  onChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    switch (selectedValue) {
      case "isImportant":
        this.taskService.filterTask(selectedValue).subscribe(data => this.taskService.allTasksObs$.next(data));
        break;

      case "isCompleted":
        this.taskService.filterTask(selectedValue).subscribe(data => this.taskService.allTasksObs$.next(data));
        break;

      default:
        this.taskService.getAllTask();
    }
  }
}
