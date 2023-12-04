import { Component } from "@angular/core";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

import { SnackType } from "../../../shared/models/data";

@Component({
    selector: "app-snackbar",
    standalone: true,
    imports: [MatSnackBarModule],
    templateUrl: "./snackbar.component.html",
    styleUrl: "./snackbar.component.scss",
})
export class SnackbarComponent {
    constructor(private snackBar: MatSnackBar) {}

    showSnackbar(content: string, action: SnackType) {
        const sb = this.snackBar.open(content, "Close", {
            duration: 2500,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: [
                action === SnackType.error ? "red-style" : "green-style",
            ],
        });
        sb.onAction().subscribe(() => {
            sb.dismiss();
        });
    }
}
