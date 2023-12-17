import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ProfileState } from "../reducers/profile.reducer";

export const selectProfileState =
    createFeatureSelector<ProfileState>("profile");

export const selectUserProfile = createSelector(
    selectProfileState,
    (state) => state.userProfile
);

export const selectProfileError = createSelector(
    selectProfileState,
    (state) => state.error
);
