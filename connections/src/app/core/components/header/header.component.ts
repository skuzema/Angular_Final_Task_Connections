/* eslint-disable operator-linebreak */
/* eslint-disable class-methods-use-this */
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router } from "@angular/router";

import { ColorSchemeService } from "../../services/color-scheme.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
    public colorScheme = "";
    public isManageAccountsVisible = false;

    constructor(
        public colorSchemeService: ColorSchemeService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.colorScheme = this.colorSchemeService.currentActive();
    }

    onThemeSwitchChange() {
        this.colorScheme = this.colorScheme === "dark" ? "light" : "dark";
        this.colorSchemeService.update(this.colorScheme);
    }

    onSignUp() {
        this.router.navigate(["/signup"]);
    }

    onLogin() {
        this.router.navigate(["/signin"]);
    }

    onSetProfile(): void {
        this.router.navigate(["/profile"]);
    }
}
