import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TaskService } from "../../services/task.sevice";
import { ITask } from "../../types/task.interface";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.scss"],
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

      const taskData: ITask = {
        name: formValue.nameTask, // Access value using form control name
        info: formValue.descriptionTask,
        isCompleted: formValue.isCompleted || false, // Set default if unchecked
        isImportant: formValue.isImportant || false, // Set default if unchecked
      };

      this.taskService.createTask(taskData);
      this.createTasksForm.reset();
    }
  }
}
