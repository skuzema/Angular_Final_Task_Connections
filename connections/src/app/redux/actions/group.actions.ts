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
    props<{ group: GroupListItem }>()
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