import { Component } from "@angular/core";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  logoutIcon = faArrowRightToBracket;
}
