export enum Status {
  CHECKING = "CHECKING",
  AUTHENTICATED = "AUTHENTICATED",
  NO_AUTHENTICATED = "NO_AUTHENTICATED",
}

export interface AuthState {
  status: Status;
  user: null | AuthUser;
  errorMessage: string | undefined;
}

export interface AuthUser {
  name: string;
  uid: string;
}
