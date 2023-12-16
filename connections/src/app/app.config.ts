import {
    HTTP_INTERCEPTORS,
    HttpClientModule,
    provideHttpClient,
} from "@angular/common/http";
import {
    ApplicationConfig,
    importProvidersFrom,
    isDevMode,
} from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideRouterStore } from "@ngrx/router-store";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { routes } from "./app.routes";
import { GroupEffects } from "./redux/effects/group.effects";
import { ProfileEffects } from "./redux/effects/profile.effects";
import { duplicatedEmailsReducer } from "./redux/reducers/duplicated-emails.reducer";
import { groupReducer } from "./redux/reducers/group.reducer";
import { profileReducer } from "./redux/reducers/profile.reducer";
import { AuthInterceptor } from "./shared/interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        importProvidersFrom(HttpClientModule),
        provideRouter(routes),
        provideStore({
            duplicatedEmails: duplicatedEmailsReducer,
            profile: profileReducer,
            group: groupReducer,
        }),
        provideEffects([ProfileEffects, GroupEffects]),
        provideRouterStore(),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
        provideAnimations(),
        provideHttpClient(),
    ],
};
