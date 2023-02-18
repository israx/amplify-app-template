import { useEffect, useState, useCallback } from "react";
import { Auth } from "aws-amplify";
import { CircularProgress } from "@mui/material";
import { AuthenticatorState } from "../interface/authenticator/state";
import {
  ConfirmSignInTOTP,
  ConfirmSignUpComponent,
  CustomAuthComponent,
  SignInComponent,
  SignUpComponent,
} from "../components/Authenticator";
import { AuthenticatorContext } from "../context/authenticatorContext";

export const Authenticator = ({ children }: { children: JSX.Element }) => {
  const [authenticatorState, setAuthenticatorState] =
    useState<AuthenticatorState>("signInComponent");

  const [user, setUser] = useState(null);

  useEffect(() => {
    verifyAuthUser();
  }, []);

  const getAuthenticatorChild = useCallback(
    (authenticatorState: AuthenticatorState): JSX.Element => {
      if (authenticatorState === "authenticatedComponent") return children;
      else if (authenticatorState === "signInComponent")
        return <SignInComponent />;
      else if (authenticatorState === "signUpComponent")
        return <SignUpComponent />;
      else if (authenticatorState === "confirmSignUpComponent")
        return <ConfirmSignUpComponent />;
      else if (authenticatorState === "customAuthChallengeComponent")
        return <CustomAuthComponent />;
      else if (authenticatorState === "confirmSignInTOTP")
        return <ConfirmSignInTOTP />;
      return <CircularProgress />;
    },
    []
  );

  const verifyAuthUser = useCallback(async () => {
    try {
      const resp = await Auth.currentAuthenticatedUser();

      setUser(resp);

      return resp
        ? setAuthenticatorState("authenticatedComponent")
        : setAuthenticatorState("signInComponent");
    } catch (error) {
      console.log(error);
      setAuthenticatorState("signInComponent");
    }
  }, []);

  return (
    <AuthenticatorContext.Provider
      value={{
        authenticatorState,
        setAuthenticatorState,
        user,
        setUser,
      }}
    >
      {getAuthenticatorChild(authenticatorState)}
    </AuthenticatorContext.Provider>
  );
};
