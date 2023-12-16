/* eslint-disable @ngrx/on-function-explicit-return-type */
import { HttpErrorResponse } from "@angular/common/http";
import { createReducer, on } from "@ngrx/store";

import { UserProfileData } from "../../shared/models/data";
import * as profileActions from "../actions/profile.actions";

export interface ProfileState {
    userProfile: UserProfileData | null;
    error: HttpErrorResponse | null;
}

export const initialState: ProfileState = {
    userProfile: null,
    error: null,
};

export const profileReducer = createReducer(
    initialState,
    on(profileActions.loadUserProfile, (state) => state),
    on(profileActions.loadUserProfileSuccess, (state, { profile }) => ({
        ...state,
        userProfile: profile,
        error: null,
    })),
    on(profileActions.loadUserProfileFailure, (state, { error }) => ({
        ...state,
        userProfile: null,
        error,
    })),
    on(profileActions.updateProfile, (state) => state),
    on(profileActions.updateProfileSuccess, (state, { name }) => ({
        ...state,
        userProfile: {
            ...state.userProfile,
            name:
                name !== undefined && name !== null
                    ? name
                    : state.userProfile!.name,
        },
        error: null,
    })),
    on(profileActions.updateProfileError, (state, { error }) => ({
        ...state,
        error,
    })),
    on(profileActions.logout, (state) => state),
    on(profileActions.logoutSuccess, (state) => ({
        ...state,
        error: null,
    })),
    on(profileActions.logoutFailure, (state, { error }) => ({
        ...state,
        userProfile: null,
        error,
    }))
);
