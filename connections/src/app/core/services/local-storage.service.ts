/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class LocalStorageService {
    private LS_CONNECTION_PREFERS_COLOR = "ConnectionsPrefersColor";
    private LS_TOKEN = "ConnectionsToken";
    private LS_UID = "ConnectionsUid";
    private LS_EMAIL = "ConnectionsEmail";

    setColorScheme(scheme: string): void {
        localStorage.setItem(this.LS_CONNECTION_PREFERS_COLOR, scheme);
    }

    getColorScheme(): string | null {
        return localStorage.getItem(this.LS_CONNECTION_PREFERS_COLOR);
    }

    setToken(token: string): void {
        localStorage.setItem(this.LS_TOKEN, token);
    }

    setUid(uid: string): void {
        localStorage.setItem(this.LS_UID, uid);
    }

    setEmail(email: string): void {
        localStorage.setItem(this.LS_EMAIL, email);
    }

    checkCredentials(): boolean {
        const token = localStorage.getItem(this.LS_TOKEN);
        const uid = localStorage.getItem(this.LS_UID);
        const email = localStorage.getItem(this.LS_EMAIL);

        return !!token && !!uid && !!email;
    }

    getCredentials(): {
        token: string | null;
        uid: string | null;
        email: string | null;
    } {
        const token = localStorage.getItem(this.LS_TOKEN);
        const uid = localStorage.getItem(this.LS_UID);
        const email = localStorage.getItem(this.LS_EMAIL);

        return { token, uid, email };
    }

    clearUserData(): void {
        localStorage.clear();
        sessionStorage.clear();
        const cookies = document.cookie.split(";");

        for (const cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
    }
}
