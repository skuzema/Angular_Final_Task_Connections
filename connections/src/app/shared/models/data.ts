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
    id: string; // group id
    name: string; // group name
    createdAt: string; // unix timestamp when group was created
    createdBy: string; // user id who created this group
}

export interface GroupID {
    groupID: string;
}
export interface PeopleListData {
    Count: number;
    Items: PeopleListItem[];
}

export interface PeopleListItem {
    name: string; // user name
    uid: string; // user id
}

export interface CredentialsData {
    uid: string | undefined;
    email: string | undefined;
    token: string | undefined;
}
