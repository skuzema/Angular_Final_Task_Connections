import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as loginSelectors from "../../../redux/selectors/login.selectors";
import { ColorSchemeService } from "../../services/color-scheme.service";
import { LocalStorageService } from "../../services/local-storage.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
    public colorScheme = "";
    isLogged$: Observable<boolean>;

    constructor(
        public colorSchemeService: ColorSchemeService,
        private router: Router,
        private storageService: LocalStorageService,
        private store: Store
    ) {
        this.isLogged$ = this.store.select(
            loginSelectors.selectCredentialsValidity
        );
    }

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

    onLogout() {
        this.storageService.clearUserData();
        this.router.navigate(["/signin"]);
    }

    onSetProfile(): void {
        this.router.navigate(["/profile"]);
    }

    onMain(): void {
        this.router.navigate(["/"]);
    }
}
