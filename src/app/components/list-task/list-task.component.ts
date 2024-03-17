import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.sevice";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-list-task",
  templateUrl: "./list-task.component.html",
  styleUrls: ["./list-task.component.scss"],
})
export class ListTaskComponent implements OnInit {
  trashIcon = faTrash;
  editIcon = faEdit;

  constructor(public taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getAllTask();
  }
}
