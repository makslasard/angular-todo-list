import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  userData: FormGroup;

  constructor(private readonly authService: AuthService) {
    this.userData = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]), // Указываем 1 начальное значение
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    if (this.userData.valid) {
      this.authService.login(this.userData.value);
    } else {
      console.log("not valid");
    }
  }
}
