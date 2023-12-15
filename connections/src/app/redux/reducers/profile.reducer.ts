import { HttpErrorResponse } from "@angular/common/http";
import { createReducer, on } from "@ngrx/store";

import { UserProfileData } from "../../shared/models/data";
import * as profileActions from "../actions/profile.actions";

export interface ProfileState {
    userProfile: UserProfileData | null;
    error: HttpErrorResponse | null;
    isEditing: boolean | null;
}

export const initialState: ProfileState = {
    userProfile: null,
    error: null,
    isEditing: false,
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
    on(profileActions.setUserProfile, (state, { profile }) => ({
        ...state,
        userProfile: profile,
        error: null,
    }))
);
