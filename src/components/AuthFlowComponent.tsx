import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useAuthenticator } from "../hooks/useAuthenticator";
import { AuthFlow } from "../interface/service/aws-amplify/auth/authFlow";

export const AuthFlowComponent = () => {
  const { user} = useAuthenticator();

  const [authFlow, setAuthFlow] = useState<AuthFlow>(user?.authenticationFlowType);

  function handleChange(event: SelectChangeEvent) {
    const flow = event.target.value as AuthFlow;
    Auth.configure({
      authenticationFlowType: flow,
    });
    setAuthFlow(flow);
  }

  return (
    <Select
      id="auth-flow"
      value={authFlow}
      label="auth-flow"
      onChange={handleChange}
    >
      <MenuItem value={AuthFlow.CUSTOM_AUTH}>{AuthFlow.CUSTOM_AUTH}</MenuItem>
      <MenuItem value={AuthFlow.USER_PASSWORD_AUTH}>
        {AuthFlow.USER_PASSWORD_AUTH}
      </MenuItem>
      <MenuItem value={AuthFlow.USER_SRP_AUTH}>
        {AuthFlow.USER_SRP_AUTH}
      </MenuItem>
    </Select>
  );
};
