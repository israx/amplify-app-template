import { Button } from "@mui/material";
import { Auth } from "aws-amplify";
import { useEffect } from "react";

export const GoogleIdentityPoolFederation = () => {
  useEffect(() => {
    const ga =
      window.gapi && window.gapi.auth2
        ? window.gapi.auth2.getAuthInstance()
        : null;

    if (!ga) createScript();
  }, []);

  const signIn = () => {
    const ga = window.gapi.auth2.getAuthInstance();
    ga.then(
      (googleUser: any) => {
        getAWSCredentials(googleUser);
      },
      (error: any) => {
        console.log(error);
      }
    );
  };

  const getAWSCredentials = async (googleUser: any) => {
    const { id_token, expires_at } = googleUser.getAuthResponse();
    const profile = googleUser.getBasicProfile();
    let user = {
      email: profile.getEmail(),
      name: profile.getName(),
    };

    const credentials = await Auth.federatedSignIn(
      "google",
      { token: id_token, expires_at },
      user
    );
    console.log("credentials", credentials);
  };

  const createScript = () => {
    // load the Google SDK
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.onload = initGapi;
    document.body.appendChild(script);
  };

  const initGapi = () => {
    // init the Google SDK client
    const g = window.gapi;
    g.load("auth2", function () {
      g.auth2.init({
        client_id: "1014969933508-eie70m5iu7kcrakljc1kp35s6ehkmp8e.apps.googleusercontent.com",
        // authorized scopes
        scope: "openid email profile",
      });
    });
  };

  return (
    <Button
      sx={{ background: "#f90", color: "white" }}
      variant="contained"
      onClick={() => signIn()}
    >
      Google with Identity Pool
    </Button>
  );
};
