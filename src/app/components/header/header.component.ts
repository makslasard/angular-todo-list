import { Component } from "@angular/core";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  logoutIcon = faArrowRightToBracket;

  constructor(public authService: AuthService) {}

  logoutHandler() {
    this.authService.logout();
  }
}
