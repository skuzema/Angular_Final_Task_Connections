import { createFeatureSelector, createSelector } from "@ngrx/store";

import { GroupState } from "../reducers/group.reducer";

const selectGroupState = createFeatureSelector<GroupState>("groups");

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
export const selectNextGroupUpdateTime = createSelector(
    selectGroupState,
    (state) => state.nextGroupUpdateTime
);
export const selectStartCounterValue = createSelector(
    selectGroupState,
    (state) => state.startCounter
  );
