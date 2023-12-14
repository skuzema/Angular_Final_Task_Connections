/* eslint-disable class-methods-use-this */
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { logout } from "../../../redux/actions/profile.actions";
import { AppState } from "../../../redux/app.state";
import { ColorSchemeService } from "../../services/color-scheme.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
    public colorScheme = "";
    constructor(
        public colorSchemeService: ColorSchemeService,
        private router: Router,
        // eslint-disable-next-line @ngrx/no-typed-global-store
        private store: Store<AppState>
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

    onLogout(): void {
        // console.log("onLogout");
        this.store.dispatch(logout());
    }
}
