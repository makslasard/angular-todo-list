import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ITask } from "../../types/task.interface";

@Component({
  selector: "app-update-task",
  templateUrl: "./update-task.component.html",
  styleUrls: ["./update-task.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateTaskComponent {
  updateTasksForm: FormGroup;

  constructor(public taskService: TaskService) {
    this.updateTasksForm = new FormGroup({
      name: new FormControl(taskService.currentTask.name, [Validators.required, Validators.minLength(6)]),
      info: new FormControl(taskService.currentTask.info, [Validators.required, Validators.minLength(6)]),
      isCompleted: new FormControl(taskService.currentTask.isCompleted),
      isImportant: new FormControl(taskService.currentTask.isImportant),
    });
  }

  onSubmit() {
    if (this.updateTasksForm.valid) {
      const formValue = this.updateTasksForm.value;

      const taskData: ITask = {
        id: formValue.id,
        name: formValue?.name,
        info: formValue?.info,
        isCompleted: formValue.isCompleted || false,
        isImportant: formValue.isImportant || false,
      };

      this.taskService.updateTask(taskData, taskData.id);
      localStorage.removeItem("currentTask");
      this.updateTasksForm.reset();
    }
  }
}
