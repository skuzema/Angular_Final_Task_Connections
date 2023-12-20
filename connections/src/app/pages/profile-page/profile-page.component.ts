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
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import {
    catchError,
    map,
    Observable,
    of,
    skip,
    switchMap,
    take,
    tap,
} from "rxjs";

import { SnackbarComponent } from "../../core/components/snackbar/snackbar.component";
import * as profileActions from "../../redux/actions/profile.actions";
import * as metaActions from "../../redux/actions/meta.actions";
import {
    selectProfileError,
    selectUserProfile,
} from "../../redux/selectors/profile.selectors";
import { SnackType, UserProfileData } from "../../shared/models/data";

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
        MatTooltipModule,
    ],
    providers: [SnackbarComponent],
    templateUrl: "./profile-page.component.html",
    styleUrl: "./profile-page.component.scss",
})
export class ProfilePageComponent implements OnInit {
    userProfile$: Observable<UserProfileData | null>;
    profileError$: Observable<HttpErrorResponse | null>;
    isEditing = false;
    isSaving = false;

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
        public snackBar: SnackbarComponent,
        private router: Router
    ) {
        this.userProfile$ = this.store.select(selectUserProfile);
        this.profileError$ = this.store.select(selectProfileError);
    }

    ngOnInit(): void {
        this.store.dispatch(profileActions.loadUserProfile());

        this.profileError$
            .pipe(skip(1), take(1))
            .subscribe((error) => this.showErrorMessage(error));

        this.userProfile$
        .subscribe((userProfile) => {
            if (userProfile) {
                const newProfile = {
                    ...userProfile,
                    createdAt: userProfile?.createdAt
                        ? this.formatDate(userProfile.createdAt)
                        : ""
                };
                this.registrationForm.patchValue(newProfile);
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

    private enableFormEditing(): void {
        this.isEditing = true;
        this.name.enable();
    }

    private disableFormEditing(): void {
        this.isEditing = false;
        this.name.disable();
    }

    private resetForm(): void {
        this.registrationForm.reset();
        this.disableFormEditing();
    }

    private applyFormValues(userProfile: UserProfileData): void {
        this.registrationForm.patchValue({
            name: userProfile.name,
        });
    }

    onEditClick(): void {
        this.enableFormEditing();
    }

    onCancelClick(): void {
        this.resetForm();
        
        this.profileError$
            .pipe(skip(1), take(1))
            .subscribe((error) => this.showErrorMessage(error));

        this.userProfile$
            .subscribe((userProfile) => {
                if (userProfile) {
                    const newProfile = {
                        ...userProfile,
                        createdAt: userProfile?.createdAt
                            ? this.formatDate(userProfile.createdAt)
                            : ""
                    };
                    this.registrationForm.patchValue(newProfile);
                }
            });
    }

    onSaveClick(): void {
        if (this.registrationForm.invalid || this.isSaving) {
            return;
        }

        this.isSaving = true;
        this.store.dispatch(
            profileActions.updateProfile({
                name: this.registrationForm.get("name")?.value,
            })
        );

        this.userProfile$
            .pipe(
                switchMap(() => this.userProfile$),
                switchMap((userProfile) => {
                    if (
                        userProfile?.name !==
                        this.registrationForm.get("name")?.value
                    ) {
                        return of(userProfile);
                    }
                    return this.userProfile$.pipe(skip(1), take(1));
                }),
                catchError((error) => {
                    this.isSaving = false;
                    const errMsg =
                        error.error.message || "Error updating user profile!";
                    this.snackBar.showSnackbar(errMsg, SnackType.error);
                    return of(error);
                })
            )
            .subscribe((userProfile) => {
                if (userProfile) {
                    this.applyFormValues(userProfile);
                    this.disableFormEditing();
                    this.isSaving = false;
                    this.snackBar.showSnackbar(
                        "Profile updated successfully.",
                        SnackType.success
                    );
                }
            });
    }

    onHomeClick() {
        this.router.navigate(["/"]);
    }

    onLogoutClick(): void {
        this.store.dispatch(profileActions.logout());

        this.profileError$
            .pipe(
                take(1),
                catchError(() => of(null))
            )
            .subscribe((error) => {
                if (error) {
                    const errMsg = error.error.message || "Logout error!";
                    this.snackBar.showSnackbar(errMsg, SnackType.error);
                } else {
                    this.store.dispatch(metaActions.logoutAction());
                    this.router.navigate(["/signin"]);
                    this.snackBar.showSnackbar(
                        "Logout successful",
                        SnackType.success
                    );
                }
            });
    }

    showErrorMessage(error: any) {
        if (error) {
            if (
                error.status === 400 &&
                error.error.type === "NotFoundException"
            ) {
                this.snackBar.showSnackbar(
                    error.error.message,
                    SnackType.error
                );
            } else {
                const msg = error.error.message
                    ? error.error.message
                    : "Network error";
                this.snackBar.showSnackbar(msg, SnackType.error);
            }
        }
    }
}
