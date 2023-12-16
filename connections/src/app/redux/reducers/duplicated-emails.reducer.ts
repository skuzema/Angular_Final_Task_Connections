/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from "@ngrx/store";

import * as DuplicatedEmailsActions from "../actions/duplicated-emails.actions";

export interface DuplicatedEmailsState {
    emails: string[];
}

export const initialState: DuplicatedEmailsState = {
    emails: [],
};

export const duplicatedEmailsReducer = createReducer(
    initialState,
    on(DuplicatedEmailsActions.addDuplicatedEmail, (state, { email }) => ({
        ...state,
        emails: [...state.emails, email],
    }))
);
