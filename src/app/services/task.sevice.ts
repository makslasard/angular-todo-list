import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API_URL } from "../constants/constant";
import { ITask } from "../types/task.interface";
import { tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  allTasksSig = signal<ITask[]>([]);
  currentPage = 1;

  totalPages = 0;

  constructor(private readonly http: HttpClient) {}

  getAllTask() {
    return this.http
      .get<ITask[]>(`${API_URL}`, {
        params: new HttpParams({ fromObject: { _page: this.currentPage, _limit: 5 } }),
      })
      .pipe(
        tap(data => {
          this.totalPages = Math.ceil(data.length / 3);
          this.allTasksSig.set(data);
          console.log(this.totalPages);
          console.log(data);
        })
      )
      .subscribe();
  }

  sortTask(sortOption: string) {
    const params = new HttpParams().set(sortOption, "true");

    this.http.get<ITask[]>(`${API_URL}`, { params }).subscribe(data => this.allTasksSig.set(data));
  }

  searchTask(searchQuery: string) {
    return this.http
      .get<ITask[]>(`${API_URL}`, {
        params: new HttpParams({
          fromObject: { name_like: searchQuery },
        }),
      })
      .subscribe(data => this.allTasksSig.set(data));
  }

  createTask(task: ITask) {
    return this.http.post<ITask>(`${API_URL}`, task).subscribe((newTask: ITask) => {
      this.allTasksSig.update(allTasks => [newTask, ...allTasks]);
    });
  }

  deleteTask(id: number | undefined) {
    return this.http.delete(`${API_URL}/${id}`).subscribe(() => {
      this.allTasksSig.update(task => task.filter(task => task.id !== id));
    });
  }

  updateStatusTask(id: number | undefined, isCompleted: boolean) {
    this.http.patch(`${API_URL}/${id}`, { isCompleted }).subscribe(() => {
      this.allTasksSig.update(tasks =>
        tasks.map(task =>
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
