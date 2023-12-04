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
