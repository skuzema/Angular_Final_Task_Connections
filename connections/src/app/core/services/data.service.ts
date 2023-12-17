import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    BehaviorSubject,
    catchError,
    filter,
    map,
    Observable,
    tap,
} from "rxjs";

import {
    GroupID,
    GroupListData,
    GroupListItem,
    LoginData,
    LoginResponseData,
    RegistrationData,
    Response,
    UserProfileData,
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
                    console.log("login service success:", response);
                    const castedResponse: Response = {
                        type: "",
                        message: "",
                    };

                    if (response.token && response.uid && data.email) {
                        this.lsService.setToken(response.token);
                        this.lsService.setUid(response.uid);
                        this.lsService.setEmail(data.email);
                    }

                    this.response.next(castedResponse);
                },
                (error) => {
                    console.log("login service error:", error);
                    const castedError: Response = error;
                    this.response.next(castedError);
                }
            )
        );
    }

    getUserProfile(): Observable<UserProfileData> {
        const url = `${this.apiUrl}/profile`;
        return this.http.get<UserProfileData>(url).pipe(
            map((response: any) => ({
                email: response.email.S,
                name: response.name.S,
                uid: response.uid.S,
                createdAt: response.createdAt.S,
            })),
            catchError((error) => {
                throw error;
            })
        );
    }

    updateUserProfile(name: string): Observable<Response> {
        const url = `${this.apiUrl}/profile`;

        return this.http.put<Response>(url, { name }).pipe(
            tap(
                (response) => this.response.next(response),
                (error) => this.response.next(error)
            )
        );
    }

    logout(): Observable<Response> {
        const url = `${this.apiUrl}/logout`;

        return this.http.delete<Response>(url).pipe(
            tap(
                (response) => {
                    console.log("service logout, success:", response);
                    this.lsService.clearUserData();
                    this.response.next(response);
                },
                (error) => {
                    console.log("service logout, error:", error);
                    this.response.next(error);
                }
            )
        );
    }

    getGroups(): Observable<GroupListData> {
        const url = `${this.apiUrl}/groups/list`;

        return this.http.get<GroupListData>(url).pipe(
            map((response: GroupListData) =>
                this.transformGroupsResponse(response)
            ),
            catchError((error) => {
                throw error;
            })
        );
    }

    private transformGroupsResponse(response: any): GroupListData {
        const transformedData: GroupListData = {
            Count: response.Count ? +response.Count : 0,
            Items: (response.Items || []).map((item: any) => ({
                id: item.id?.S || "",
                name: item.name?.S || "",
                createdAt: item.createdAt?.S || "",
                createdBy: item.createdBy?.S || "",
            })) as GroupListItem[],
        };

        return transformedData;
    }

    createGroup(name: string): Observable<GroupID> {
        const url = `${this.apiUrl}/groups/create`;

        return this.http.post<GroupID>(url, name).pipe(
            tap(
                (response: any) => this.response.next(response),
                (error: Response) => this.response.next(error)
            )
        );
    }

    deleteGroup(groupId: string): Observable<Response> {
        const url = `${this.apiUrl}/groups/delete?groupID=${groupId}`;

        return this.http.delete<Response>(url).pipe(
            tap(
                (response: any) => this.response.next(response),
                (error: Response) => this.response.next(error)
            )
        );
    }
}
