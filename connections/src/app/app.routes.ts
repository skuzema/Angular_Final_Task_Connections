import { Routes } from "@angular/router";

export const routes: Routes = [
    { path: "", redirectTo: "main", pathMatch: "full" },
    {
        path: "main",
        loadChildren: () =>
            import("./pages/main-page/main-page.component").then(
                (m) => m.MainPageComponent
            ),
    },
];
