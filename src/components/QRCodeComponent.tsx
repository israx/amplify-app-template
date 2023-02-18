import { Box, Button, TextField } from "@mui/material";
import QRCode from "react-qr-code";
import {  useState } from "react";
import { Auth } from "aws-amplify";
import { useAuthenticator } from "../hooks/useAuthenticator";

export const QRCodeComponent = () => {
  const [verificationCode, setVerificationCode] = useState<string>("");

  const [secretCode, setSecretCode] = useState<string | null>(null);
  const { user } = useAuthenticator();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVerificationCode(e.target.value);
  }
  const appName = "aws-amplify-v5";
  const qrCodeLink =
    "otpauth://totp/AWS:" + appName + "?secret=" + secretCode ?? "";

  async function getSecretCode() {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      const secret = await Auth.setupTOTP(authUser);

      setSecretCode(secret);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleVerify() {
    if (!secretCode)
      throw new Error(
        "QR code is not defined, please check the value of your query string"
      );

    if (!verificationCode)
      return console.warn("verification code can't be empty");

    try {
      const session = await Auth.verifyTotpToken(user, verificationCode);

      await Auth.setPreferredMFA(user, "TOTP");
      setSecretCode(null);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box>
      <Button onClick={() => getSecretCode()}>Setup TOTP</Button>
      <Box
        sx={{
          padding: 2,
          border: "1px solid #DCDCDC",
          borderRadius: 2,
          display: secretCode ? "flex" : "none",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 
        show QR code and verify button as long as 
        the secretCode is not null 
       */}
        {<QRCode value={qrCodeLink} />}
        <TextField value={verificationCode} onChange={handleChange} />
        {<Button onClick={() => handleVerify()}>Verify</Button>}
      </Box>
    </Box>
  );
};
