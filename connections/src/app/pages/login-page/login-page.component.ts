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

import { DataService } from "../../core/services/data.service";
import { LoginData } from "../../shared/models/data";

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
    templateUrl: "./login-page.component.html",
    styleUrl: "./login-page.component.scss",
})
export class LoginPageComponent {
    email = new FormControl("", [Validators.required, Validators.email]);
    password = new FormControl("", [Validators.required]);
    hide = true;

    loginForm = this._formBuilder.group({
        email: this.email,
        password: this.password,
    });

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private dataService: DataService
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
        const loginData: LoginData = {
            email: this.loginForm.value.email!,
            password: this.loginForm.value.password!,
        };

        this.dataService.login(loginData).subscribe(() => {
            this.router.navigate(["/main"]);
        });
    }

    onSignUp() {
        this.router.navigate(["/signup"]);
    }
}
