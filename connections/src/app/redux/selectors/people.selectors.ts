import { createFeatureSelector, createSelector } from "@ngrx/store";

import { PeopleState } from "../reducers/people.reducer";

const selectPeopleState = createFeatureSelector<PeopleState>("peoples");

export const selectPeoples = createSelector(
    selectPeopleState,
    (state) => state.peoples
);
export const selectConversations = createSelector(
    selectPeopleState,
    (state) => state.conversations
);
export const selectLoading = createSelector(
    selectPeopleState,
    (state) => state.loading
);
export const selectError = createSelector(
    selectPeopleState,
    (state) => state.error
);
export const selectNextPeopleUpdateTime = createSelector(
    selectPeopleState,
    (state) => state.nextPeopleUpdateTime
);
export const selectStartCounterValue = createSelector(
    selectPeopleState,
    (state) => state.startCounter
  );