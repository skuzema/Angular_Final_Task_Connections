import { createAction, props } from "@ngrx/store";

import { UserProfileData } from "../../shared/models/data";

export const loadUserProfile = createAction("[Profile] Load User Profile");
export const setUserProfile = createAction(
    "[Profile] Set User Profile",
    props<{ profile: UserProfileData }>()
);
export const setUserProfileError = createAction(
    "[Profile] Set User Profile Error",
    props<{ error: any }>()
);
export const logout = createAction("[Profile] Logout");
