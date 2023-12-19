import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, tap } from "rxjs";

import {
    CompanionName,
    ConversationID,
    ConversationListData,
    ConversationListItem,
    GroupID,
    GroupListData,
    GroupListItem,
    LoginData,
    LoginResponseData,
    PeopleListData,
    PeopleListItem,
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
                    this.lsService.clearUserData();
                    this.response.next(response);
                },
                (error) => {
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
        const nameObj = `{ "name": "${name}"}`;

        return this.http.post<GroupID>(url, nameObj).pipe(
            tap(
                (response: any) => {
                    this.response.next(response);
                },
                (error: Response) => {
                    this.response.next(error);
                }
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

    getPeoples(): Observable<PeopleListData> {
        const url = `${this.apiUrl}/users`;

        return this.http.get<PeopleListData>(url).pipe(
            map((response: PeopleListData) =>
                this.transformPeoplesResponse(response)
            ),
            catchError((error) => {
                throw error;
            })
        );
    }

    private transformPeoplesResponse(response: any): PeopleListData {
        const transformedData: PeopleListData = {
            Count: response.Count ? +response.Count : 0,
            Items: (response.Items || []).map((item: any) => ({
                name: item.name?.S || "",
                uid: item.uid?.S || "",
            })) as PeopleListItem[],
        };

        return transformedData;
    }

    getConversations(): Observable<ConversationListData> {
        const url = `${this.apiUrl}/conversations/list`;

        return this.http.get<ConversationListData>(url).pipe(
            map((response: ConversationListData) =>
                this.transformConversationsResponse(response)
            ),
            catchError((error) => {
                throw error;
            })
        );
    }

    private transformConversationsResponse(
        response: any
    ): ConversationListData {
        const transformedData: ConversationListData = {
            Count: response.Count ? +response.Count : 0,
            Items: (response.Items || []).map((item: any) => ({
                id: item.id?.S || "",
                companionID: item.companionID?.S || "",
            })) as ConversationListItem[],
        };

        return transformedData;
    }

    createConversation(companion: CompanionName): Observable<ConversationID> {
        const url = `${this.apiUrl}/conversations/create`;

        return this.http.post<ConversationID>(url, companion).pipe(
            tap(
                (response: any) => {
                    this.response.next(response);
                },
                (error: Response) => {
                    this.response.next(error);
                }
            )
        );
    }
}
