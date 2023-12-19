export interface Response {
    type: string;
    message: string;
}

export interface RegistrationData {
    email: string;
    name: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponseData {
    token: string;
    uid: string;
}

export enum SnackType {
    error = "error",
    success = "success",
}

export interface UserProfileData {
    email?: string;
    name: string;
    uid?: string;
    createdAt?: string;
}

export interface GroupListData {
    Count?: number;
    Items?: GroupListItem[];
}

export interface GroupListItem {
    id: string; 
    name: string;
    createdAt: string;
    createdBy: string;
}

export interface GroupID {
    groupID: string;
}

export interface PeopleListData {
    Count?: number;
    Items?: PeopleListItem[];
}

export interface PeopleListItem {
    name: string;
    uid: string;
}

export interface ConversationListData {
    Count?: number;
    Items?: ConversationListItem[];
}

export interface ConversationListItem {
    id?: string; 
    companionID?: string;
}

export interface CompanionName {
    companion?: string;
}

export interface ConversationID {
    conversationID: string;
}

export interface CredentialsData {
    uid: string | undefined;
    email: string | undefined;
    token: string | undefined;
}

export interface PeopleWithConversation {
    name?: string;
    uid?: string;
    conversationId?: string;
}