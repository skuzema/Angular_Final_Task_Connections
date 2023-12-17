import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

import {
    CredentialsData,
    LoginData,
    LoginResponseData,
} from "../../shared/models/data";

export const login = createAction(
    "[Login Page] Login",
    props<{ loginData: LoginData }>()
);

export const loginSuccess = createAction(
    "[Login API] Login Success",
    props<{ loginResponse: LoginResponseData }>()
);

export const loginFailure = createAction(
    "[Login API] Login Failure",
    props<{ error: HttpErrorResponse }>()
);

export const setCredentials = createAction(
    "[Login] Set Credentials",
    props<{ credentials: CredentialsData }>()
);
