import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-group-dialog-page",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: "./group-dialog-page.component.html",
  styleUrl: "./group-dialog-page.component.scss"
})
export class GroupDialogPageComponent {

  constructor(private router: Router) {}

  onMainClick(event: Event): void {
      event.preventDefault();
      this.router.navigate(["/"]);
  }
}
