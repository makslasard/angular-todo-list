import { ChangeDetectionStrategy, Component } from "@angular/core";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { TaskService } from "../../services/task.service";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  leftArrowIcon = faAngleDoubleLeft;
  rightArrowIcon = faAngleDoubleRight;

  constructor(public taskService: TaskService) {}

  getPageNumbers(): number[] {
    return new Array(this.taskService.totalPages).fill(0).map((_, idx) => idx + 1);
  }

  incrCurrentPage() {
    if (this.taskService.currentPage < this.taskService.totalPages) {
      this.taskService.currentPage++;
      this.taskService.getAllTask();
    }
  }

  decrCurrentPage() {
    if (this.taskService.currentPage > 1) {
      this.taskService.currentPage--;
      this.taskService.getAllTask();
    }
  }
}
