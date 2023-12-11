import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class LocalStorageService {
    private LS_CONNECTION_DUPLICATION = "ConnectionsDuplications";
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
}
