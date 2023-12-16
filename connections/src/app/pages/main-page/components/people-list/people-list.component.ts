import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: "app-people-list",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./people-list.component.html",
    styleUrl: "./people-list.component.scss",
})
export class PeopleListComponent {}
