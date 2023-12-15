import { DuplicatedEmailsState } from "./reducers/duplicated-emails.reducer";
import { ProfileState } from "./reducers/profile.reducer";

export interface AppState {
    duplicatedEmails: DuplicatedEmailsState;
    profile: ProfileState;
}
