import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import {
    LoginData,
    LoginResponseData,
    RegistrationData,
    Response,
} from "../../shared/models/data";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: "root",
})
export class DataService {
    private apiUrl = "https://tasks.app.rs.school/angular";
    private response = new BehaviorSubject<Response>({ type: "", message: "" });
    public response$ = this.response.asObservable();

    constructor(
        private http: HttpClient,
        private lsService: LocalStorageService
    ) {}

    addUser(data: RegistrationData): Observable<Response> {
        const url = `${this.apiUrl}/registration`;
        return this.http.post<Response>(url, data).pipe(
            tap(
                (response) => this.response.next(response),
                (error) => {
                    this.response.next(error);
                }
            )
        );
    }

    login(data: LoginData): Observable<LoginResponseData> {
        const url = `${this.apiUrl}/login`;
        return this.http.post<LoginResponseData>(url, data).pipe(
            tap(
                (response) => {
                    const castedResponse: Response = {
                        type: "",
                        message: "",
                    };

                    if (response.token && response.uid && data.email) {
                        this.lsService.setToken(response.token);
                        this.lsService.setUid(response.uid);
                        this.lsService.setUid(data.email);
                    }

                    this.response.next(castedResponse);
                },
                (error) => {
                    const castedError: Response = error;
                    this.response.next(castedError);
                }
            )
        );
    }
}
