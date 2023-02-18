import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useAuthenticator } from "../../hooks/useAuthenticator";
import { AuthenticatorScreenWrapper } from "./AuthenticatorScreenWrapper";

type SignUpFormData = {
  username: string;
  password: string;
  email: string;
};
export const SignUpComponent = () => {
  const [data, setData] = useState<SignUpFormData>({
    username: "",
    password: "",
    email: "",
  });

  const { setAuthenticatorState } = useAuthenticator();

  async function handleSignUp() {
    try {
      await Auth.signUp({
        username: data.username,
        password: data.password,
        attributes: {
          email: data.email,
        },
      });
      data.username && localStorage.setItem("username", data.username);
      setAuthenticatorState("confirmSignUpComponent");
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <AuthenticatorScreenWrapper width="280px">
      <FormControl>
        <InputLabel htmlFor="username">Username</InputLabel>
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

      <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          name="email"
          onChange={handleChange}
          value={data.email}
        />
      </FormControl>

      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <Button
          sx={{ background: "#f90", color: "white" }}
          variant="contained"
          onClick={() => handleSignUp()}
        >
          Sign Up
        </Button>
        <Button
          variant="text"
          onClick={() => setAuthenticatorState("signInComponent")}
        >
          Go back to sign in
        </Button>
      </Box>
    </AuthenticatorScreenWrapper>
  );
};
