import { createReducer, on } from "@ngrx/store";

import { UserProfileData } from "../../shared/models/data";
import * as profileActions from "../actions/profile.actions";

export interface ProfileState {
    userProfile: UserProfileData | null;
    error: string | null;
    isEditing: boolean | null;
}

export const initialState: ProfileState = {
    userProfile: null,
    error: null,
    isEditing: false,
};

export const profileReducer = createReducer(
    initialState,
    on(profileActions.setUserProfile, (state, { profile }) => ({
        ...state,
        userProfile: profile,
        error: null,
    })),
    on(profileActions.loadUserProfile, (state) => state)
);
