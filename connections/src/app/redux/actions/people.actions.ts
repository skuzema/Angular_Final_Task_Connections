import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

import { CompanionName, ConversationListData, ConversationListItem, PeopleListData } from "../../shared/models/data";

export const loadPeoples = createAction("[People] Load Peoples");

export const loadPeoplesSuccess = createAction(
    "[People] Load Peoples Success",
    props<{ peoples: PeopleListData }>()
);

export const loadPeoplesFailure = createAction(
    "[People] Load Peoples Failure",
    props<{ error: HttpErrorResponse }>()
);

export const loadConversations = createAction("[People] Load Conversations");

export const loadConversationsSuccess = createAction(
    "[People] Load Conversations Success",
    props<{ conversations: ConversationListData }>()
);

export const loadConversationsFailure = createAction(
    "[People] Load Conversations Failure",
    props<{ error: HttpErrorResponse }>()
);

export const createConversation = createAction(
    "[People] Create Conversation",
    props<{ companion: CompanionName }>()
);

export const createConversationSuccess = createAction(
    "[People] Create Conversation Success",
    props<{ item: ConversationListItem }>()
);

export const createConversationFailure = createAction(
    "[People] Create Conversation Failure",
    props<{ error: HttpErrorResponse }>()
);

export const updatePeoples = createAction("[People] Update Peoples");

export const updatePeoplesSuccess = createAction(
    "[People] Update Peoples Success",
    props<{ peoples: PeopleListData }>()
);

export const updatePeoplesFailure = createAction(
    "[People] Update Peoples Failure",
    props<{ error: HttpErrorResponse }>()
);

export const updateConversations = createAction("[People] Update Conversations");

export const updateConversationsSuccess = createAction(
    "[People] Update Conversations Success",
    props<{ conversations: ConversationListData }>()
);

export const updateConversationsFailure = createAction(
    "[People] Update Peoples Failure",
    props<{ error: HttpErrorResponse }>()
);

export const setNextPeopleUpdateTime = createAction(
    "[People] Set Next People Update Time"
);

export const decrementNextPeopleUpdateTime = createAction(
    "[People] Decrement Next People Update Time"
);

export const setStartCounter = createAction(
    "[People] Set Start Counter Value",
    props<{ value: boolean }>()
);

export const noop = createAction(
    "[People] No Operation"
);
