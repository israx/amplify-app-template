import { useContext } from "react";
import { AuthenticatorContext } from "../context/authenticatorContext";

export const useAuthenticator = () => {
    const context = useContext(AuthenticatorContext);
  
    return {
      user: context.user,
      setAuthenticatorState: context.setAuthenticatorState,
      authenticatorState: context.authenticatorState,
      setUser : context.setUser
    };
  };
  