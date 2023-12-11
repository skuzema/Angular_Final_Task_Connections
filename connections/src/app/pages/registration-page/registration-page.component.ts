/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable class-methods-use-this */
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import { Component } from "@angular/core";
import {
    AbstractControl,
    AsyncValidatorFn,
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
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { debounceTime, map, Observable, take } from "rxjs";

import { SnackbarComponent } from "../../core/components/snackbar/snackbar.component";
import { DataService } from "../../core/services/data.service";
import * as DuplicatedEmailsActions from "../../redux/actions/duplicated-emails.actions";
import { AppState } from "../../redux/app.state";
import { selectDuplicatedEmails } from "../../redux/selectors/duplicated-emails.selectors";
import { RegistrationData, SnackType } from "../../shared/models/data";

@Component({
    selector: "app-registration-page",
    standalone: true,
    imports: [
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
    templateUrl: "./registration-page.component.html",
    styleUrl: "./registration-page.component.scss",
})
export class RegistrationPageComponent {
    hide = true;
    isDuplicationError = false;
    isLoading = false;

    name = new FormControl("", [Validators.required, this.nameValidator]);
    email = new FormControl("", {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.emailValidator()],
    });
    password = new FormControl("", [
        Validators.required,
        this.passwordStrengthValidator,
    ]);

    registrationForm = this._formBuilder.group({
        name: this.name,
        email: this.email,
        password: this.password,
    });

    // duplicatedEmails$: Observable<string[]>;

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private dataService: DataService,
        public snackBar: SnackbarComponent,
        // eslint-disable-next-line @ngrx/no-typed-global-store
        private store: Store<AppState>
    ) {}

    private emailValidator(): AsyncValidatorFn {
        return (
            control: AbstractControl
        ):
            | Promise<{ [key: string]: boolean } | null>
            | Observable<{ [key: string]: boolean } | null> => {
            const enteredEmail = control.value as string;

            return this.store
                .select(selectDuplicatedEmails, {
                    email: enteredEmail,
                })
                .pipe(
                    debounceTime(500),
                    take(1),
                    // eslint-disable-next-line @ngrx/avoid-mapping-selectors
                    map((email) => (email ? { duplicationError: true } : null))
                );
        };
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

    getEmailErrorMessage() {
        if (this.email.hasError("required")) {
            return "You must enter a value";
        }
        if (this.email.hasError("email")) {
            return "Not a valid email";
        }
        if (this.email.hasError("duplicationError")) {
            return "Email address already taken";
        }
        return "";
    }

    getPasswordErrorMessage() {
        if (this.password.hasError("required")) {
            return "You must enter a value";
        }
        if (this.password.hasError("invalidPassword")) {
            return "Min 8 symbols, include at least 1 capital letter, at least 1 digit and at least 1 special symbol";
        }
        return "";
    }

    private nameValidator(
        control: AbstractControl
    ): { [key: string]: boolean } | null {
        const value = control.value as string;
        const isValid = /^[a-zA-Z\s]{1,40}$/.test(value);

        return isValid ? null : { invalidName: true };
    }

    private passwordStrengthValidator(
        control: AbstractControl
    ): { [key: string]: boolean } | null {
        const value = control.value as string;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumbers = /\d/.test(value);
        const hasSpecialChars = /[!@#?]/.test(value);

        const isValid =
            value.length >= 8 && hasUpperCase && hasNumbers && hasSpecialChars;

        return isValid ? null : { invalidPassword: true };
    }

    onSubmit() {
        this.isLoading = true;

        const registrationData: RegistrationData = {
            name: this.registrationForm.value.name!,
            email: this.registrationForm.value.email!,
            password: this.registrationForm.value.password!,
        };
        this.dataService.addUser(registrationData).subscribe(
            () => {
                this.isLoading = false;
                this.snackBar.showSnackbar(
                    "Registration successful",
                    SnackType.success
                );
                this.router.navigate(["/signin"]);
            },
            (error) => {
                this.isLoading = false;

                if (
                    error.status === 400 &&
                    error.error.type === "PrimaryDuplicationException"
                ) {
                    this.isDuplicationError = true;

                    this.store.dispatch(
                        DuplicatedEmailsActions.addDuplicatedEmail({
                            email: registrationData.email,
                        })
                    );

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
        );
    }

    onFieldChange() {
        this.isDuplicationError = false;
    }

    onLogin() {
        this.router.navigate(["/signin"]);
    }
}
