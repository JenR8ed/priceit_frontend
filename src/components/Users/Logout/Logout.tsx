import { WindowSharp } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export function Logout() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function handleLogout() {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    history.forward;
  }
  

  return (
    <>
      <Button
        color="info"
        variant="contained"
        type="button"
        onClick={() => {
          if(isLoggedIn){
            handleLogout(); 
          }
        }}
      >
        Logout
      </Button>
    </>
  );
}
