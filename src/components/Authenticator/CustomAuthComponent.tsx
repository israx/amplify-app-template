import React, { useState } from "react";
import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { Auth } from "aws-amplify";
import { useAuthenticator } from "../../hooks/useAuthenticator";
type CustomAuthFormData = {
  challenge: string;
};
export const CustomAuthComponent = () => {
  const [data, setData] = useState<CustomAuthFormData>({
    challenge: "",
  });
  const {user, setAuthenticatorState} = useAuthenticator()

  async function handleCustomeAuthChallenge() {
    try {

    
      const resp = await Auth.sendCustomChallengeAnswer(
        user,
        data.challenge
      );
    
      setAuthenticatorState("authenticatedComponent");

    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "300px",
        padding: 2,
        border: "1px solid gray",
        borderRadius: "8px",
      }}
    >
      <FormControl>
        <InputLabel htmlFor="challenge">Auth Challenge</InputLabel>
        <Input
          id="challenge"
          name="challenge"
          onChange={handleChange}
          value={data.challenge}
        />
      </FormControl>

      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <Button variant="contained" onClick={handleCustomeAuthChallenge}>
          verify
        </Button>
      </Box>
    </Box>
  );
};
