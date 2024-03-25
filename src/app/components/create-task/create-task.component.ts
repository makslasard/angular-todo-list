import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TaskService } from "../../services/task.service";
import { ITask } from "../../types/task.interface";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent {
  createTasksForm: FormGroup;

  constructor(public taskService: TaskService) {
    this.createTasksForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      info: new FormControl("", [Validators.required, Validators.minLength(6)]),
      isCompleted: new FormControl(false),
      isImportant: new FormControl(false),
    });
  }

  onSubmit() {
    if (this.createTasksForm.valid) {
      const formValue = this.createTasksForm.value;

      const taskData: Omit<ITask, "id"> = {
        name: formValue.name,
        info: formValue.info,
        isCompleted: formValue.isCompleted || false,
        isImportant: formValue.isImportant || false,
      };

      this.taskService.createTask(taskData).subscribe((newTask: ITask) => {
        this.taskService.allTasksObs$.next([newTask, ...this.taskService.allTasksObs$.value]);
      });

      this.createTasksForm.reset();
    }
  }
}
