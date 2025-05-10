export type SIGN_IN_TYPE = {
    user: USER_TYPE;
}

export type USER_TYPE = {
    email:    string;
    username: string;
    bio:      null;
    image:    string;
    token:    string;
}