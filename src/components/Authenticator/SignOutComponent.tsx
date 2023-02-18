import Button from "@mui/material/Button";
import { Auth } from "aws-amplify";
import { useAuthenticator } from "../../hooks/useAuthenticator";

export const SignOutComponent = () => {
  const { setAuthenticatorState } = useAuthenticator();
  return (
    <Button
      sx={{
        background: "#f90",
        color: "white",
        display: "block",
      }}
      variant="contained"
      onClick={async () => {
        await Auth.signOut();
        setAuthenticatorState("signInComponent");
      }}
    >
      Sign Out
    </Button>
  );
};
