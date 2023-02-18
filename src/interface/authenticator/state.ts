export type AuthenticatorState =
  | "signInComponent"
  | "signUpComponent"
  | "confirmSignUpComponent"
  | "authenticatedComponent"
  | "customAuthChallengeComponent"
  | "confirmSignInTOTP"
  | "newPasswordRequired";