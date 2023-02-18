import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { AuthenticatorScreenWrapper } from "./AuthenticatorScreenWrapper";
import { useAuthenticator } from "../../hooks/useAuthenticator";
type ConfirmSignUpFormData = {
  code: string;
};
export const ConfirmSignUpComponent = () => {
  const [data, setData] = useState<ConfirmSignUpFormData>({
    code: "",
  });

  const {setAuthenticatorState} = useAuthenticator()

  async function handleConfirm() {
    try {
      const username = localStorage.getItem("username") ?? "";
      await Auth.confirmSignUp(username, data.code);

      setAuthenticatorState("signInComponent");
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
        <InputLabel htmlFor="code">Code</InputLabel>
        <Input
          id="code"
          name="code"
          onChange={handleChange}
          value={data.code}
        />
      </FormControl>
      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <Button variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button variant="text">Go to Sign In</Button>
      </Box>
    </AuthenticatorScreenWrapper>
  );
};
