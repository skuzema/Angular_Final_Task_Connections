/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable class-methods-use-this */
import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Store } from "@ngrx/store";
import { map, Observable, tap } from "rxjs";

import { SnackbarComponent } from "../../core/components/snackbar/snackbar.component";
import * as profileActions from "../../redux/actions/profile.actions";
import {
    selectProfileError,
    selectUserProfile,
} from "../../redux/selectors/profile.selectors";
import { Response, SnackType, UserProfileData } from "../../shared/models/data";

@Component({
    selector: "app-profile-page",
    standalone: true,
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
    ],
    providers: [SnackbarComponent],
    templateUrl: "./profile-page.component.html",
    styleUrl: "./profile-page.component.scss",
})
export class ProfilePageComponent implements OnInit {
    userProfile$: Observable<UserProfileData | null>;
    profileError$: Observable<HttpErrorResponse | null>;

    name = new FormControl({ value: "", disabled: true }, [
        Validators.required,
        this.nameValidator,
    ]);
    email = new FormControl({ value: "", disabled: true });
    uid = new FormControl({ value: "", disabled: true });
    createdAt = new FormControl({ value: "", disabled: true });

    registrationForm = this.formBuilder.group({
        name: this.name,
        email: this.email,
        uid: this.uid,
        createdAt: this.createdAt,
    });

    constructor(
        private store: Store,
        private formBuilder: FormBuilder,
        public snackBar: SnackbarComponent
    ) {
        this.userProfile$ = this.store.select(selectUserProfile);
        this.profileError$ = this.store.select(selectProfileError);
    }

    ngOnInit(): void {
        this.store.dispatch(profileActions.loadUserProfile());

        this.userProfile$
            .pipe(
                map((userProfile) => ({
                    ...userProfile,
                    createdAt: userProfile?.createdAt
                        ? this.formatDate(userProfile.createdAt)
                        : "",
                })),
                tap((userProfile) =>
                    this.registrationForm.patchValue(userProfile)
                )
            )
            .subscribe();

        this.profileError$.subscribe((error) => {
            console.error("profileError$:", error);
            if (error) {
                const err: Response = error.error;
                this.snackBar.showSnackbar(err.message, SnackType.error);
            }
        });
    }

    private formatDate(timestamp: string): string {
        return new Date(parseInt(timestamp, 10)).toLocaleString();
    }

    private nameValidator(
        control: AbstractControl
    ): { [key: string]: boolean } | null {
        const value = control.value as string;
        const isValid = /^[a-zA-Z\s]{1,40}$/.test(value);

        return isValid ? null : { invalidName: true };
    }

    getNameErrorMessage() {
        if (this.name.hasError("required")) {
            return "You must enter a value";
        }
        if (this.name.hasError("invalidName")) {
            return "Allowed only letters or spaces, maximum 40 characters";
        }
        return "";
    }
}
