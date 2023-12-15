import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { Observable, tap } from "rxjs";

import * as profileActions from "../../redux/actions/profile.actions";
import { selectProfileError, selectUserProfile } from "../../redux/selectors/profile.selectors";
import { UserProfileData, SnackType } from "../../shared/models/data";
import { MatButtonModule } from "@angular/material/button";
import {     
    AbstractControl,
    AsyncValidatorFn,
    FormBuilder,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators 
} from "@angular/forms";
import { SnackbarComponent } from "../../core/components/snackbar/snackbar.component";

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
        MatIconModule],
    providers: [SnackbarComponent],
    templateUrl: "./profile-page.component.html",
    styleUrl: "./profile-page.component.scss",
})
export class ProfilePageComponent implements OnInit {
    userProfile$: Observable<UserProfileData | null>;
    profileError$: Observable<string | null>;

    name = new FormControl({value: "", disabled: true}, [Validators.required, this.nameValidator]);
    email = new FormControl({value: "", disabled: true});
    uid = new FormControl({value: "", disabled: true});
    createdAt = new FormControl({value: "", disabled: true});

    registrationForm = this._formBuilder.group({
        name: this.name,
        email: this.email,
        uid: this.uid,
        createdAt: this.createdAt,
    });
    
    constructor(
        private store: Store, 
        private _formBuilder: FormBuilder, 
        public snackBar: SnackbarComponent
    ) {
        this.userProfile$ = this.store.select(selectUserProfile);
        this.profileError$ = this.store.select(selectProfileError);
    }

    ngOnInit(): void {
        console.log("profile ngOnInit");
        this.store.dispatch(profileActions.loadUserProfile());

        this.userProfile$.subscribe(userProfile => {
            if (userProfile) {
console.log("userProfile:", userProfile);                
                const valuesUserProfile = {
                    name: "test",
                    email: userProfile.email.S,
                    uid: userProfile.uid.S,
                    createdAt: userProfile.createdAt.S
                };
console.log("values:", valuesUserProfile);
                this.registrationForm.patchValue(valuesUserProfile);
            }
        });

        this.profileError$.subscribe(error => {
            if (error) {
                this.snackBar.showSnackbar(error, SnackType.error);
            }
        });
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
