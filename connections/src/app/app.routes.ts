/* eslint-disable implicit-arrow-linebreak */
import { Routes } from "@angular/router";

import { AuthGuard } from "./core/guards/auth.guard";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

export const routes: Routes = [
    { path: "", redirectTo: "main", pathMatch: "full" },
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
        path: "signup",
        loadComponent: () =>
            import(
                "./pages/registration-page/registration-page.component"
            ).then((m) => m.RegistrationPageComponent),
    },
    {
        path: "signin",
        loadComponent: () =>
            import("./pages/login-page/login-page.component").then(
                (m) => m.LoginPageComponent
            ),
    },
    { path: "**", component: NotFoundPageComponent },
];
