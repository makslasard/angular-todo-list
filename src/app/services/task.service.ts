import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API_URL } from "../constants/constant";
import { ITask } from "../types/task.interface";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  currentTask: ITask = JSON.parse(localStorage.getItem("currentTask")!) as ITask;
  currentPage = 1;
  totalPages = 0;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  allTasksObs$ = new BehaviorSubject<ITask[]>([]);

  getAllTask(): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(`${API_URL}`, {
        params: new HttpParams({ fromObject: { _page: this.currentPage, _limit: 5 } }),
      })
      .pipe(
        tap(data => {
          this.totalPages = Math.ceil(data.length / 3);
        })
      );
  }

  updateTask(task: Omit<ITask, "id">, id: number) {
    this.http.patch(`${API_URL}/${id}`, { ...task });
  }

  getTaskById(id: number): Observable<ITask> {
    return this.http.get<ITask>(`${API_URL}/${id}`).pipe(
      tap(task => {
        localStorage.setItem("currentTask", JSON.stringify(task));
      })
    );
  }

  filterTask(filterOption: string): Observable<ITask[]> {
    const params = new HttpParams().set(filterOption, "true");

    return this.http.get<ITask[]>(`${API_URL}`, { params });
  }

  searchTask(searchQuery: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${API_URL}`, {
      params: new HttpParams({
        fromObject: { name_like: searchQuery },
      }),
    });
  }

  createTask(task: Omit<ITask, "id">): Observable<ITask> {
    return this.http.post<ITask>(`${API_URL}`, task);
  }

  deleteTask(id: number) {
    return this.http.delete(`${API_URL}/${id}`);
  }

  updateStatusTask(id: number, isCompleted: boolean) {
    return this.http.patch(`${API_URL}/${id}`, { isCompleted });
  }
}
