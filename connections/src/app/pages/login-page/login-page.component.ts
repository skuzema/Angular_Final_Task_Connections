/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import { Component } from "@angular/core";
import {
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

import { SnackbarComponent } from "../../core/components/snackbar/snackbar.component";
import { DataService } from "../../core/services/data.service";
import { LoginData, SnackType } from "../../shared/models/data";

@Component({
    selector: "app-login-page",
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
    templateUrl: "./login-page.component.html",
    styleUrl: "./login-page.component.scss",
})
export class LoginPageComponent {
    hide = true;
    isLoading = false;
    notFountError = false;

    email = new FormControl("", [Validators.required, Validators.email]);
    password = new FormControl("", [Validators.required]);

    loginForm = this._formBuilder.group({
        email: this.email,
        password: this.password,
    });

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private dataService: DataService,
        public snackBar: SnackbarComponent
    ) {}

    getEmailErrorMessage() {
        if (this.email.hasError("required")) {
            return "You must enter a value";
        }
        if (this.email.hasError("email")) {
            return "Not a valid email";
        }
        return "";
    }

    getPasswordErrorMessage() {
        if (this.password.hasError("required")) {
            return "You must enter a value";
        }
        return "";
    }

    onSubmit() {
        this.isLoading = true;

        const loginData: LoginData = {
            email: this.loginForm.value.email!,
            password: this.loginForm.value.password!,
        };

        this.dataService.login(loginData).subscribe(
            () => {
                this.isLoading = false;
                this.snackBar.showSnackbar(
                    "Login successful",
                    SnackType.success
                );
                this.router.navigate(["/main"]);
            },
            (error) => {
                this.isLoading = false;

                if (
                    error.status === 400 &&
                    error.error.type === "NotFoundException"
                ) {
                    this.notFountError = true;
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
        this.notFountError = false;
    }

    onSignUp() {
        this.router.navigate(["/signup"]);
    }
}
