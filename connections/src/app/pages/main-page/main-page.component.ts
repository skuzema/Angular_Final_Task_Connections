import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { GroupListComponent } from "./components/group-list/group-list.component";
import { PeopleListComponent } from "./components/people-list/people-list.component";

@Component({
    selector: "app-main-page",
    standalone: true,
    imports: [CommonModule, GroupListComponent, PeopleListComponent],
    templateUrl: "./main-page.component.html",
    styleUrl: "./main-page.component.scss",
})
export class MainPageComponent {}
