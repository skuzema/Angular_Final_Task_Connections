import { Component, Inject } from "@angular/core";
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
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
        ReactiveFormsModule,
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

    groupName = new FormControl('', [Validators.required, this.groupNameValidator]);

    getGroupNameErrorMessage() {
        if (this.groupName.hasError("required")) {
            return "You must enter a value";
        }
        if (this.groupName.hasError("invalidName")) {
            return "Allowed only letters, digits or spaces, maximum 30 characters";
        }
        return "";
    }
    
    private groupNameValidator(
        control: AbstractControl
    ): { [key: string]: boolean } | null {
        const value = control.value as string;
        const isValid = /^[a-zA-Z0-9 ]{1,30}$/.test(value);

        return isValid ? null : { invalidName: true };
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
