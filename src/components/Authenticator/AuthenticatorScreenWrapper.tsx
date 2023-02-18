import { Box } from "@mui/material";
import { AmplifyHeader } from "./AmplifyHeader";

export const AuthenticatorScreenWrapper = ({
  children,
  width = "300px",
}: {
  children: JSX.Element[];
  width?: `${string}px`;
}) => {
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
        width,
      }}
    >
      <AmplifyHeader />

      {children}
    </Box>
  );
};
