import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

import { GroupListData, GroupListItem } from "../../shared/models/data";

export const loadGroups = createAction("[Group] Load Groups");

export const loadGroupsSuccess = createAction(
    "[Group] Load Groups Success",
    props<{ groups: GroupListData }>()
);

export const loadGroupsFailure = createAction(
    "[Group] Load Groups Failure",
    props<{ error: HttpErrorResponse }>()
);

export const createGroup = createAction(
    "[Group] Create Group",
    props<{ name: string }>()
);

export const createGroupSuccess = createAction(
    "[Group] Create Group Success",
    props<{ item: GroupListItem }>()
);

export const createGroupFailure = createAction(
    "[Group] Create Group Failure",
    props<{ error: HttpErrorResponse }>()
);

export const deleteGroup = createAction(
    "[Group] Delete Group",
    props<{ groupId: string }>()
);

export const deleteGroupSuccess = createAction(
    "[Group] Delete Group Success",
    props<{ groupId: string }>()
);

export const deleteGroupFailure = createAction(
    "[Group] Delete Group Failure",
    props<{ error: HttpErrorResponse }>()
);

export const updateGroups = createAction("[Group] Update Groups");

export const updateGroupsSuccess = createAction(
    "[Group] Update Groups Success",
    props<{ groups: GroupListData }>()
);

export const updateGroupsFailure = createAction(
    "[Group] Update Groups Failure",
    props<{ error: HttpErrorResponse }>()
);

export const setNextGroupUpdateTime = createAction(
    "[Group] Set Next Group Update Time"
);

export const decrementNextGroupUpdateTime = createAction(
    "[Group] Decrement Next Group Update Time"
);
