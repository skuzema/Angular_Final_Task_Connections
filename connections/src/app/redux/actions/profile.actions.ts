import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

import { UserProfileData } from "../../shared/models/data";

export const loadUserProfile = createAction("[Profile] Load User Profile");

export const loadUserProfileSuccess = createAction(
    "[Profile] Load User Profile Success",
    props<{ profile: UserProfileData }>()
);

export const loadUserProfileFailure = createAction(
    "[Profile] Load User Profile Failure",
    props<{ error: HttpErrorResponse }>()
);

export const updateProfile = createAction(
    "[Profile] Save Profile",
    props<{ name: string | null | undefined }>()
);

export const updateProfileSuccess = createAction(
    "[Profile] Update Profile Success",
    props<{ name: string | null | undefined }>()
);

export const updateProfileError = createAction(
    "[Profile] Update Profile Error",
    props<{ error: HttpErrorResponse }>()
);

export const logout = createAction("[Profile] Logout");

export const logoutSuccess = createAction("[Profile] Logout Success");

export const logoutFailure = createAction(
    "[Profile] Logout Failure",
    props<{ error: HttpErrorResponse }>()
);
