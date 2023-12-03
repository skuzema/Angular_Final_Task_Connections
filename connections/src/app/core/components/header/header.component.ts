import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { ColorSchemeService } from "../../services/color-scheme.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [MatButtonModule, MatIconModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
    public colorScheme = "";
    constructor(public colorSchemeService: ColorSchemeService) {}

    ngOnInit(): void {
        this.colorScheme = this.colorSchemeService.currentActive();
    }

    onThemeSwitchChange() {
        this.colorScheme = this.colorScheme === "dark" ? "light" : "dark";
        this.colorSchemeService.update(this.colorScheme);
    }
}
