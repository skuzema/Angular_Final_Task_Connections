import { createFeatureSelector, createSelector } from "@ngrx/store";

import { PeopleState } from "../reducers/people.reducer";
import { ConversationListItem, PeopleListItem, PeopleWithConversation } from "../../shared/models/data";

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

export const selectPeopleWithConversation = createSelector(
  selectPeopleState,
  (state: PeopleState) => {
    const peopleWithConversation: PeopleWithConversation[] = [];

    const peoples = state?.peoples?.Items;
    if (peoples) {
      for (const person of peoples) {
        const conversationId = state?.conversations?.Items?.find(
          conversation => conversation.companionID === person.uid
        )?.id;

        peopleWithConversation.push({
          name: person.name,
          uid: person.uid,
          conversationId,
        });
      }
    }

    return peopleWithConversation;
  },
);