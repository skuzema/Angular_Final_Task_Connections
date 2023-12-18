import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, switchMap, take } from "rxjs";

import { LocalStorageService } from "../../core/services/local-storage.service";
import * as loginActions from "../../redux/actions/login.actions";
import * as loginSelectors from "../../redux/selectors/login.selectors";
import { CredentialsData } from "../models/data";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    storeCredentials$: Observable<CredentialsData | undefined>;

    credentials = this.lsService.getCredentials();

    constructor(private lsService: LocalStorageService, private store: Store) {
        this.storeCredentials$ = this.store.select(
            loginSelectors.selectCredentials
        );
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (
            request.url.endsWith("/registration") ||
            request.url.endsWith("/login")
        ) {
            return next.handle(request);
        }

        return this.storeCredentials$.pipe(
            take(1),
            switchMap((storeCredentials) => {
                let credentials = {
                    uid: "",
                    email: "",
                    token: "",
                };

                if (
                    !storeCredentials?.uid ||
                    !storeCredentials?.email ||
                    !storeCredentials?.token
                ) {
                    credentials = {
                        uid: this.credentials.uid!,
                        email: this.credentials.email!,
                        token: this.credentials.token!,
                    };
                    this.store.dispatch(
                        loginActions.setCredentials({ credentials })
                    );
                }
                const modifiedRequest = request.clone({
                    setHeaders: {
                        "rs-uid": storeCredentials?.uid || credentials.uid,
                        "rs-email":
                            storeCredentials?.email || credentials.email,
                        Authorization: `Bearer ${
                            storeCredentials?.token || credentials.token
                        }`,
                        "Content-Type": "application/json",
                    },
                });

                return next.handle(modifiedRequest);
            })
        );
    }
}
