import { Injectable, signal } from "@angular/core";
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
  isAuthSig = signal<boolean>(false);

  // Переменная относительно которой будем проверять, в системе мы или нет

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router, // Чтобы сделать переадресацию после успешного логина или регистрации
    private readonly toastr: ToastrService
  ) {
    const token = localStorage.getItem("token");
    this.isAuthSig.set(!!token);
  }

  signUp(userData: IAuthUser) {
    return this.http
      .post(`${API_URL}/user`, userData)
      .pipe(
        tap(() => {
          this.login(userData);
        }),
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
          this.isAuthSig.set(true);
        }),
        catchError(err => {
          this.handleError(err);
          throw new Error(err.message());
        })
      )
      .subscribe(() => {
        this.toastr.success("Logged In");
        this.router.navigate(["/home"]);
      });
  }

  logout() {
    localStorage.removeItem("token");
    this.isAuthSig.set(false);
    this.router.navigate(["/login"]);
    this.toastr.success("logged out");
  }

  // Можно вынести в отдельный service обработки ошибок и вызывать вместо this.handleError(err);
  private handleError(err: HttpErrorResponse) {
    this.toastr.error(err.error.message());
  }
}
