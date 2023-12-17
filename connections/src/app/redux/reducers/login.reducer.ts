/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from "@ngrx/store";

import { LoginData, LoginResponseData } from "../../shared/models/data";
import * as loginActions from "../actions/login.actions";

export interface LoginState {
    loginData: LoginData | null | undefined;
    loginResponse: LoginResponseData | null;
    error: any;
}

export const initialState: LoginState = {
    loginData: null,
    loginResponse: null,
    error: null,
};

export const loginReducer = createReducer(
    initialState,
    on(loginActions.login, (state, { loginData }) => ({
        ...state,
        loginData,
        error: null,
    })),
    on(loginActions.loginSuccess, (state, { loginResponse }) => ({
        ...state,
        loginResponse,
        error: null,
    })),
    on(loginActions.loginFailure, (state, { error }) => ({
        ...state,
        loginResponse: null,
        error,
    })),
    on(loginActions.setCredentials, (state, { credentials }) => ({
        ...state,
        loginData: {
            ...state.loginData!,
            email:
                credentials.email !== undefined && credentials.email !== null
                    ? credentials.email
                    : "",
        },
        loginResponse: {
            ...state.loginResponse!,
            token:
                credentials.token !== undefined && credentials.token !== null
                    ? credentials.token
                    : "",
            uid:
                credentials.uid !== undefined && credentials.uid !== null
                    ? credentials.uid
                    : "",
        },
        error: null,
    }))
);
