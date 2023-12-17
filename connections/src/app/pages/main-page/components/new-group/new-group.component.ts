import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

export interface DialogData {
    groupName: string;
}

@Component({
    selector: "app-new-group",
    templateUrl: "./new-group.component.html",
    styleUrl: "./new-group.component.scss",
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ],
})
export class NewGroupComponent {
    constructor(
        public dialogRef: MatDialogRef<NewGroupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    cancel(): void {
        this.dialogRef.close();
    }
}
