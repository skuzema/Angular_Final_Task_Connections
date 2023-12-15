import { createAction, props } from "@ngrx/store";

import { UserProfileData } from "../../shared/models/data";

export const loadUserProfile = createAction("[Profile] Load User Profile");

export const loadUserProfileSuccess = createAction(
    "[Profile] Load User Profile Success",
    props<{ profile: UserProfileData }>()
);

export const loadUserProfileFailure = createAction(
    "[Profile] Load User Profile Failure",
    props<{ error: any }>()
);

export const setUserProfile = createAction(
    "[Profile] Set User Profile",
    props<{ profile: UserProfileData }>()
);

export const setUserProfileError = createAction(
    "[Profile] Set User Profile Error",
    props<{ error: string }>()
);

export const logout = createAction("[Profile] Logout");
