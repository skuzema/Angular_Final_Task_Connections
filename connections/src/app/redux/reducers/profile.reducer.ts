import { createReducer, on } from "@ngrx/store";

import * as profileActions from "../actions/profile.actions";

export interface ProfileState {
    userProfile: UserProfile | null;
    error: string | null;
}

export const initialState: ProfileState = {
    userProfile: null,
    error: null,
    isEditing: false,
};

export const profileReducer = createReducer(
    initialState,
    on(profileActions.logoutSuccess, () => initialState),
    on(profileActions.logoutError, (state, { error }) => ({
        ...state,
        error,
    }))
);
