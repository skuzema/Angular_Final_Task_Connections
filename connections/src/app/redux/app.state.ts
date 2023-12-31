import { DuplicatedEmailsState } from "./reducers/duplicated-emails.reducer";
import { GroupState } from "./reducers/group.reducer";
import { LoginState } from "./reducers/login.reducer";
import { PeopleState } from "./reducers/people.reducer";
import { ProfileState } from "./reducers/profile.reducer";

export interface AppState {
    duplicatedEmails: DuplicatedEmailsState;
    profile: ProfileState;
    groups: GroupState;
    peoples: PeopleState;
    login: LoginState;
}
