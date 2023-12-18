/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from "@ngrx/store";

import { GroupListData } from "../../shared/models/data";
import * as GroupActions from "../actions/group.actions";

export interface GroupState {
    groups: GroupListData;
    loading: boolean;
    error: any;
    nextGroupUpdateTime: number | null;
}

export const initialState: GroupState = {
    groups: {},
    loading: false,
    error: null,
    nextGroupUpdateTime: null,
};

export const groupReducer = createReducer(
    initialState,
    on(GroupActions.loadGroups, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(GroupActions.loadGroupsSuccess, (state, { groups }) => ({
        ...state,
        groups,
        loading: false,
        error: null,
    })),
    on(GroupActions.loadGroupsFailure, (state, { error }) => ({
        ...state,
        groups: {},
        loading: false,
        error,
    })),
    on(GroupActions.createGroup, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(GroupActions.createGroupSuccess, (state, { item }) => {
        const existingItems = state.groups?.Items || [];
        const updatedGroups: GroupListData = {
            ...state.groups,
            Items: [...existingItems, item],
        };
        return {
            ...state,
            groups: updatedGroups,
            loading: false,
        };
    }),
    on(GroupActions.createGroupFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(GroupActions.deleteGroup, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(GroupActions.deleteGroupSuccess, (state, { groupId }) => {
        const updatedGroups: GroupListData = {
            ...state.groups,
            Items: state.groups?.Items?.filter((g) => g.id !== groupId) || [],
        };
        return {
            ...state,
            groups: updatedGroups,
            loading: false,
        };
    }),
    on(GroupActions.deleteGroupFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(GroupActions.updateGroups, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(GroupActions.updateGroupsSuccess, (state, { groups }) => ({
        ...state,
        groups,
        loading: false,
        error: null,
    })),
    on(GroupActions.updateGroupsFailure, (state, { error }) => ({
        ...state,
        groups: {},
        loading: false,
        error,
    })),
    on(GroupActions.setNextGroupUpdateTime, (state) => ({
        ...state,
        nextGroupUpdateTime: 60,
    })),
    on(GroupActions.decrementNextGroupUpdateTime, (state) => ({
        ...state,
        nextGroupUpdateTime: state.nextGroupUpdateTime
            ? state.nextGroupUpdateTime - 1
            : 0,
    }))
);
