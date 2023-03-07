import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { useAuthenticator } from "../../hooks/useAuthenticator";

export const SMSComponent = () => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const { user, setAuthenticatorState, setUser } = useAuthenticator();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVerificationCode(e.target.value);
  }

  async function handleVerify() {
    if (!verificationCode)
      return console.warn("verification code can't be empty");

    try {
      const resp = await Auth.confirmSignIn(
        user,
        verificationCode,
        "SMS_MFA"
      );

  
      setUser(resp);

      setAuthenticatorState("authenticatedComponent");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box
      sx={{
        padding: 2,
        border: "1px solid #DCDCDC",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h2">
        SMS CODE
      </Typography>

      <TextField value={verificationCode} onChange={handleChange} />
      <Button onClick={() => handleVerify()}>Verify</Button>
    </Box>
  );
};
