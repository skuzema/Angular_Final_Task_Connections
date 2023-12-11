/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { DuplicatedEmailsState } from "../reducers/duplicated-emails.reducer";

export const selectDuplicatedEmailsState =
    createFeatureSelector<DuplicatedEmailsState>("duplicatedEmails");

export const selectDuplicatedEmails = createSelector(
    selectDuplicatedEmailsState,
    // eslint-disable-next-line no-confusing-arrow
    (state: DuplicatedEmailsState, props: { email: string }) =>
        state.emails.includes(props.email) ? props.email : null
);
