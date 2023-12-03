import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { HeaderComponent } from "./core/components/header/header.component";
import { ColorSchemeService } from "./core/services/color-scheme.service";
import { MainPageComponent } from "./pages/main-page/main-page.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet, HeaderComponent, MainPageComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    title = "connections";
    constructor(private colorSchemeService: ColorSchemeService) {
        this.colorSchemeService.load();
    }
}
