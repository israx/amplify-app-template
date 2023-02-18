import { AuthenticatorState } from "./state";

export type AuthenticatorContextInteface = {
    authenticatorState: AuthenticatorState;
    user: any;
    setAuthenticatorState: (state: AuthenticatorState) => void;
    setUser:(user:any)=>any
  };