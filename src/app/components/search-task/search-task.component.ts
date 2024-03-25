import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TaskService } from "../../services/task.service";

@Component({
  selector: "app-search-task",
  templateUrl: "./search-task.component.html",
  styleUrls: ["./search-task.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTaskComponent {
  searchQuery = "";

  constructor(public taskService: TaskService) {}

  onChange() {
    console.log(this.searchQuery);
    this.taskService.searchTask(this.searchQuery).subscribe(data => this.taskService.allTasksObs$.next(data));
  }
}
