import React, { useState } from "react";
import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { Auth } from "aws-amplify";
import { useAuthenticator } from "../../hooks/useAuthenticator";
import { AuthenticatorScreenWrapper } from "./AuthenticatorScreenWrapper";
import { GoogleIdentityPoolFederation } from "./GoogleIdentityPoolFederation";
import { FacebookIdentityPoolFederation } from "./FacebookIdentityPoolFederation";

type ChallengeName = | 'CUSTOM_CHALLENGE'
		| 'MFA_SETUP'
		| 'NEW_PASSWORD_REQUIRED'
		| 'SELECT_MFA_TYPE'
		| 'SMS_MFA'
		| 'SOFTWARE_TOKEN_MFA';

enum CognitoHostedUIIdentityProvider {
  Google = "Google"
}
type SignInFormData = {
  username: string;
  password: string;
};
export const SignInComponent = () => {
  const { setAuthenticatorState, setUser } = useAuthenticator();

  const [data, setData] = useState<SignInFormData>({
    username: "",
    password: "",
  });

  async function handleSignIn() {
    try {
      const resp = await Auth.signIn(data.username, data.password);

      setUser(resp);

      if (resp.authenticationFlowType === "CUSTOM_AUTH") {
        return setAuthenticatorState("customAuthChallengeComponent");
      }
 

      console.log(resp.challengeName)
      handleAuthChallenge(resp.challengeName);
    } catch (error) {
      console.log(error);
    }
  }

  function handleAuthChallenge(challengeName: ChallengeName) {
    switch (challengeName) {
      case "CUSTOM_CHALLENGE":
        return setAuthenticatorState("customAuthChallengeComponent");
      case "MFA_SETUP":
        return setAuthenticatorState("setupMFA")
      case "SOFTWARE_TOKEN_MFA":
        return setAuthenticatorState("confirmSignInTOTP");
      case "NEW_PASSWORD_REQUIRED":
        return setAuthenticatorState("newPasswordRequired");
      case "SOFTWARE_TOKEN_MFA":
        return setAuthenticatorState("confirmSignInTOTP");
      case "SMS_MFA":
        return setAuthenticatorState("SMS_MFA")
      default:
        return setAuthenticatorState("authenticatedComponent");
    }
  }
  async function handleFederate() {
    try {
      const credentials = await Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
      });
      console.log(credentials);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <AuthenticatorScreenWrapper>
      <FormControl>
        <InputLabel htmlFor="username">Email address</InputLabel>
        <Input
          id="username"
          name="username"
          onChange={handleChange}
          value={data.username}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          name="password"
          onChange={handleChange}
          value={data.password}
        />
      </FormControl>
      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <Button
          sx={{ background: "#f90", color: "white" }}
          variant="contained"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Button
          sx={{ background: "#f90", color: "white" }}
          variant="contained"
          onClick={() => handleFederate()}
        >
          Google
        </Button>

        <Button
          variant="text"
          onClick={() => setAuthenticatorState("signUpComponent")}
        >
          Sign up
        </Button>
      </Box>
    </AuthenticatorScreenWrapper>
  );
};
