import { createAction, props } from "@ngrx/store";

export const addDuplicatedEmail = createAction(
    "[Duplicated Emails] Add Duplicated Email",
    props<{ email: string }>()
);
