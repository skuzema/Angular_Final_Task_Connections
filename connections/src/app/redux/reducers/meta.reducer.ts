import { ActionReducer, ActionReducerMap, INIT, MetaReducer} from '@ngrx/store';

import * as meta from '../actions/meta.actions';
import { duplicatedEmailsReducer } from './duplicated-emails.reducer';
import { profileReducer } from './profile.reducer';
import { groupReducer } from './group.reducer';
import { peopleReducer } from './people.reducer';
import { loginReducer } from './login.reducer';
import { AppState } from '../app.state';

export const reducers: ActionReducerMap<AppState> = {
    duplicatedEmails: duplicatedEmailsReducer,
    profile: profileReducer,
    groups: groupReducer,
    peoples: peopleReducer,
    login: loginReducer,
}

export const logout = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => {
  return (state, action): AppState => {
    if (action !== null && action.type === meta.logoutAction.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
};

export const metaReducers: MetaReducer<AppState>[] = [logout];
