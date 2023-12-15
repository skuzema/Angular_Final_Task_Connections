import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { LocalStorageService } from "../../core/services/local-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    credentials = this.lsService.getCredentials();

    constructor(private lsService: LocalStorageService) {
        console.log("constructor AuthInterceptor");
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        console.log("intercept AuthInterceptor");
        if (
            request.url.endsWith("/registration") ||
            request.url.endsWith("/login")
        ) {
            return next.handle(request);
        }

        const modifiedRequest = request.clone({
            setHeaders: {
                "rs-uid": this.credentials.uid!,
                "rs-email": this.credentials.email!,
                Authorization: `Bearer ${this.credentials.token}`,
            },
        });

        return next.handle(modifiedRequest);
    }
}
