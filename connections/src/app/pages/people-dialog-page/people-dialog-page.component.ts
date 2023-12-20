import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-people-dialog-page",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: "./people-dialog-page.component.html",
  styleUrl: "./people-dialog-page.component.scss"
})
export class PeopleDialogPageComponent {
  constructor(private router: Router) {}

  onMainClick(event: Event): void {
      event.preventDefault();
      this.router.navigate(["/"]);
  }
}
