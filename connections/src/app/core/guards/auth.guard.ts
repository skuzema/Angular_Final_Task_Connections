import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";

import { LocalStorageService } from "../services/local-storage.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private storageService: LocalStorageService,
        private router: Router
    ) {}

    canActivate(): boolean {
        return this.checkAuth();
    }

    canLoad(): boolean {
        return this.checkAuth();
    }

    private checkAuth(): boolean {
        if (this.storageService.checkCredentials()) {
            return true;
        }
        this.router.navigate(["/signin"]);
        return false;
    }
}
