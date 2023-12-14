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

    constructor(private lsService: LocalStorageService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (
            request.url.endsWith("/signup") ||
            request.url.endsWith("/signin")
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
