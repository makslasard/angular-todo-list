import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-task",
  templateUrl: "./list-task.component.html",
  styleUrls: ["./list-task.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTaskComponent implements OnInit {
  trashIcon = faTrash;
  editIcon = faEdit;

  constructor(
    public taskService: TaskService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.taskService.getAllTask().subscribe(data => {
      this.taskService.allTasksObs$.next(data);
    });
  }

  editTaskById(id: number) {
    this.taskService.getTaskById(id).subscribe(() => this.router.navigate(["/id"]));
  }

  deleteTaskById(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.taskService.allTasksObs$.next(this.taskService.allTasksObs$.value.filter(task => task.id !== id));
    });
  }

  editStatusTask(id: number, isCompleted: boolean) {
    this.taskService.updateStatusTask(id, isCompleted).subscribe(() => {
      this.taskService.allTasksObs$.next(
        this.taskService.allTasksObs$.value.map(task =>
          task.id === id
            ? {
                ...task,
                isCompleted,
              }
            : task
        )
      );
    });
  }
}
