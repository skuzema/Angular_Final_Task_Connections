/* eslint-disable class-methods-use-this */
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import { Component } from "@angular/core";
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
import { Router } from "@angular/router";

import { DataService } from "../../core/services/data.service";
import { RegistrationData } from "../../shared/models/data";

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
    templateUrl: "./registration-page.component.html",
    styleUrl: "./registration-page.component.scss",
})
export class RegistrationPageComponent {
    name = new FormControl("", [Validators.required, this.nameValidator]);
    email = new FormControl("", [Validators.required, Validators.email]);
    password = new FormControl("", [
        Validators.required,
        this.passwordStrengthValidator,
    ]);
    hide = true;

    registrationForm = this._formBuilder.group({
        name: this.name,
        email: this.email,
        password: this.password,
    });

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private dataService: DataService
    ) {}

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
        console.log("On Submit:", this.registrationForm.value);
        const registrationData: RegistrationData = {
            name: this.registrationForm.value.name!,
            email: this.registrationForm.value.email!,
            password: this.registrationForm.value.password!,
        };

        this.dataService.addUser(registrationData).subscribe(() => {
            this.router.navigate(["/signin"]);
        });
    }
}
