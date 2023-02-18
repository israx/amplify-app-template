import { SvgIcon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ReactComponent as AmplifyIcon } from "../../assets/amplify-logo.svg";


export const AmplifyHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap:1,
        alignItems: "center",
        background: "#f90",
        height: "64px",
        borderRadius:"8px",
        padding:"0 12px" 
       
      }}
    >
      <SvgIcon  component={AmplifyIcon} viewBox="0 0 126 94"/>
      <Typography sx={{fontFamily:"Arial", color:"white", fontSize:"2rem"}}>Amplify</Typography>
     
    </Box>
  );
};
