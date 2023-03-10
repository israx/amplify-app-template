import { Box } from "@mui/material";
import { AuthFlowComponent } from "../components/AuthFlowComponent";
import { SetMFAComponent } from "../components/SetMFAComponent";

import { SetupTOTPComponent } from "../components/SetupTOTPComponent";
import { SignOutComponent } from "../components/Authenticator";
export const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "start",
        padding: 1,
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      <AuthFlowComponent />

      <SetMFAComponent />

      <SetupTOTPComponent />

      <SignOutComponent />
    </Box>
  );
};
