import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { MFAType } from "../../interface/service/aws-amplify/auth/mfaType";
import { useAuthenticator } from "../../hooks/useAuthenticator";
import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

export const SelectMFAComponent = () => {
  const [mfaType, setMfaType] = useState<MFAType>(MFAType.NOMFA);

  const { user , setAuthenticatorState} = useAuthenticator();

  async function handleChange(event: SelectChangeEvent) {
    const mfa = event.target.value as MFAType;

    setMfaType(mfa);
  }

  async function handleSubmit() {
    try {
      
      const User = user as CognitoUser

      User.sendMFASelectionAnswer(mfaType, {
        onSuccess: (session) => {
            console.log(session)
        },
        onFailure: (err) => {
          console.log(err);
        },
        mfaRequired: (challengeName, paramenters)=>{
            setAuthenticatorState("SMS_MFA")
        },
        totpRequired: (challengeName, paramenters)=>{
            setAuthenticatorState("confirmSignInTOTP")

        }
      });
     
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box>
      <Select
        id="auth-flow"
        value={mfaType}
        label="auth-flow"
        onChange={handleChange}
      >
        <MenuItem value={MFAType.NOMFA}>{MFAType.NOMFA}</MenuItem>
        <MenuItem value={MFAType.SMS}>{MFAType.SMS}</MenuItem>
        <MenuItem value={MFAType.SOFTWARE_TOKEN_MFA}>
          {MFAType.SOFTWARE_TOKEN_MFA}
        </MenuItem>
      </Select>
      <Button onClick={() => handleSubmit()}>submit</Button>
    </Box>
  );
};
