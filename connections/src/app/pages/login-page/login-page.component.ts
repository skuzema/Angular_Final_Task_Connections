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

    constructor(private _formBuilder: FormBuilder, private router: Router) {}

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
        console.log("On Submit:", this.email.value);
    }
}
