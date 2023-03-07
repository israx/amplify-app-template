import {
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { MFAType } from "../interface/service/aws-amplify/auth/mfaType";

export const SelectMFAComponent = () => {
  const [mfaType, setMfaType] = useState<MFAType | undefined>(undefined);
  const [user, setUser] = useState(null)
  useEffect(() => {
    getMFA();
  }, []);

  async function getMFA() {
    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser();

      const mfa = await Auth.getPreferredMFA(authenticatedUser);
      console.log(mfa);
      setMfaType(mfa as MFAType);
      setUser(authenticatedUser)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChange(event: SelectChangeEvent) {
    const mfa = event.target.value as MFAType;
    
    try {
      await Auth.setPreferredMFA(user, mfa);
      setMfaType(mfa);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {mfaType ? (
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
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
