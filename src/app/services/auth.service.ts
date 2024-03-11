import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IAuthUser, IUser } from "../types/user.interface";
import { API_URL } from "../constants/constants";
import { catchError, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router, // Чтобы сделать переадресацию после успешного логина или регистрации
    private readonly toastr: ToastrService
  ) {}

  signUp(userData: IAuthUser) {
    return this.http
      .post(`${API_URL}/user`, userData)
      .pipe(
        catchError(err => {
          this.handleError(err);
          throw new Error(err.message());
        })
      )
      .subscribe(() => {
        this.toastr.success("Created");
      });
  }

  login(userData: IAuthUser) {
    return this.http
      .post<IUser>(`${API_URL}/auth/login`, userData)
      .pipe(
        tap((res: IUser) => {
          localStorage.setItem("token", res.token);
        })
      )
      .subscribe(() => {
        this.toastr.success("Logged In");
      });
  }

  private handleError(err: HttpErrorResponse) {
    this.toastr.error(err.error.message());
  }
}
