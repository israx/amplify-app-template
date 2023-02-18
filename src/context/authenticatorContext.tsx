import React from "react";
import { AuthenticatorContextInteface } from "../interface/authenticator/context";


const initialContext: AuthenticatorContextInteface = {
  authenticatorState: "signInComponent",
  user: null,
  setAuthenticatorState: (state) => {},
  setUser: (user)=>{}
};
export const AuthenticatorContext =
  React.createContext<AuthenticatorContextInteface>(initialContext);



