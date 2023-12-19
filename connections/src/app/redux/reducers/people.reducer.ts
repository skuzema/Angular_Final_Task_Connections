/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from "@ngrx/store";

import { ConversationListData, PeopleListData } from "../../shared/models/data";
import * as peopleActions from "../actions/people.actions";

export interface PeopleState {
    peoples: PeopleListData;
    conversations: ConversationListData;
    loading: boolean;
    error: any;
    nextPeopleUpdateTime: number | null;
    startCounter: boolean;
}

export const initialState: PeopleState = {
    peoples: {},
    conversations: {},
    loading: false,
    error: null,
    nextPeopleUpdateTime: null,
    startCounter: false
};

export const peopleReducer = createReducer(
    initialState,
    on(peopleActions.loadPeoples, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(peopleActions.loadPeoplesSuccess, (state, { peoples }) => ({
        ...state,
        peoples,
        loading: false,
        error: null,
    })),
    on(peopleActions.loadPeoplesFailure, (state, { error }) => ({
        ...state,
        peoples: {},
        loading: false,
        error,
    })),
    on(peopleActions.loadConversations, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(peopleActions.loadConversationsSuccess, (state, { conversations }) => ({
        ...state,
        conversations,
        loading: false,
        error: null,
    })),
    on(peopleActions.loadConversationsFailure, (state, { error }) => ({
        ...state,
        conversations: {},
        loading: false,
        error,
    })),
    on(peopleActions.createConversation, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(peopleActions.createConversationSuccess, (state, { item }) => {
        const existingItems = state.conversations?.Items || [];
        const updatedConversations: ConversationListData = {
            ...state.conversations,
            Items: [...existingItems, item],
        };
        return {
            ...state,
            conversations: updatedConversations,
            loading: false,
        };
    }),
    on(peopleActions.createConversationFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(peopleActions.updatePeoples, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(peopleActions.updatePeoplesSuccess, (state, { peoples }) => ({
        ...state,
        peoples,
        loading: false,
        error: null,
    })),
    on(peopleActions.updatePeoplesFailure, (state, { error }) => ({
        ...state,
        peoples: {},
        loading: false,
        error,
    })),
    on(peopleActions.updateConversations, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(peopleActions.updateConversationsSuccess, (state, { conversations }) => ({
        ...state,
        conversations,
        loading: false,
        error: null,
    })),
    on(peopleActions.updateConversationsFailure, (state, { error }) => ({
        ...state,
        conversations: {},
        loading: false,
        error,
    })),
    on(peopleActions.setNextPeopleUpdateTime, (state) => ({
        ...state,
        nextPeopleUpdateTime: 60,
    })),
    on(peopleActions.decrementNextPeopleUpdateTime, (state) => ({
        ...state,
        nextPeopleUpdateTime: state.nextPeopleUpdateTime
            ? state.nextPeopleUpdateTime - 1
            : 0,
    })),
    on(peopleActions.setStartCounter, (state, { value }) => ({
        ...state,
        startCounter: value,
    }))
);
