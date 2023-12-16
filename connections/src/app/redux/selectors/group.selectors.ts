import { createFeatureSelector, createSelector } from "@ngrx/store";

import { GroupState } from "../reducers/group.reducer";

const selectGroupState = createFeatureSelector<GroupState>("group");

export const selectGroups = createSelector(
    selectGroupState,
    (state) => state.groups
);
export const selectLoading = createSelector(
    selectGroupState,
    (state) => state.loading
);
export const selectError = createSelector(
    selectGroupState,
    (state) => state.error
);
