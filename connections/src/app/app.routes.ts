import { Routes } from "@angular/router";

import { AuthGuard } from "./core/guards/auth.guard";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

export const routes: Routes = [
    { path: "", redirectTo: "main", pathMatch: "full" },
    {
        path: "signin",
        loadComponent: () =>
            import("./pages/login-page/login-page.component").then(
                (m) => m.LoginPageComponent
            ),
    },
    {
        path: "signup",
        loadComponent: () =>
            import(
                "./pages/registration-page/registration-page.component"
            ).then((m) => m.RegistrationPageComponent),
    },
    {
        path: "main",
        loadComponent: () =>
            import("./pages/main-page/main-page.component").then(
                (m) => m.MainPageComponent
            ),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
    },
    {
        path: "profile",
        loadComponent: () =>
            import("./pages/profile-page/profile-page.component").then(
                (m) => m.ProfilePageComponent
            ),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
    },
    {
        path: "group/:groupID",
        loadComponent: () =>
            import("./pages/group-dialog-page/group-dialog-page.component").then(
                (m) => m.GroupDialogPageComponent
            ),
            canLoad: [AuthGuard],
            canActivate: [AuthGuard],
    },
    {
        path: "conversation/:conversationID",
        loadComponent: () =>
            import("./pages/people-dialog-page/people-dialog-page.component").then(
                (m) => m.PeopleDialogPageComponent
            ),
            canLoad: [AuthGuard],
            canActivate: [AuthGuard],
    },
    { path: "**", component: NotFoundPageComponent },
];
