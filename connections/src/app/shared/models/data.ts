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
    email: {
        S: "string"; // user email
    };
    name: {
        S: "string"; // user name
    };
    uid: {
        S: "string"; // user id
    };
    createdAt: {
        S: "string"; // unix timestamp in milliseconds when profile was created
    };
}
