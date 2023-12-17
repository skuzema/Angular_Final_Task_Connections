// login.selectors.ts
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { LoginState } from "../reducers/login.reducer";

export const selectLoginState = createFeatureSelector<LoginState>("login");

export const selectLoginResponse = createSelector(
    selectLoginState,
    (state) => state.loginResponse
);

export const selectLoginError = createSelector(
    selectLoginState,
    (state) => state.error
);

export const selectToken = createSelector(
    selectLoginState,
    (data) => data?.loginResponse?.token
);

export const selectUid = createSelector(
    selectLoginState,
    (data) => data?.loginResponse?.uid
);

export const selectEmail = createSelector(
    selectLoginState,
    (data) => data?.loginData?.email
);

export const selectCredentials = createSelector(
    selectToken,
    selectUid,
    selectEmail,
    (token, uid, email) => ({ token, uid, email })
);

export const selectCredentialsValidity = createSelector(
    selectToken,
    selectUid,
    selectEmail,
    (token, uid, email) => {
        return (
            token !== null &&
            uid !== null &&
            email !== null &&
            token !== undefined &&
            uid !== undefined &&
            email !== undefined
        );
    }
);
