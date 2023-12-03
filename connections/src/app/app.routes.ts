import { Routes } from "@angular/router";

import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

export const routes: Routes = [
    { path: "", redirectTo: "main", pathMatch: "full" },
    {
        path: "main",
        loadComponent: () =>
            import("./pages/main-page/main-page.component").then(
                (m) => m.MainPageComponent
            ),
    },
    { path: "**", component: NotFoundPageComponent },
];
