import { HTTP_INTERCEPTORS, provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideRouterStore } from "@ngrx/router-store";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { routes } from "./app.routes";
import { duplicatedEmailsReducer } from "./redux/reducers/duplicated-emails.reducer";
import { AuthInterceptor } from "./shared/interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        provideRouter(routes),
        provideStore({ duplicatedEmails: duplicatedEmailsReducer }),
        provideEffects(),
        provideRouterStore(),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
        provideAnimations(),
        provideHttpClient(),
    ],
};
