import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
export function Logout() {
  const [cookie, setCookie, removeCookie] = useCookies(["logged_in"]);
  function handleLogout() {
    removeCookie("logged_in");
    return false;
  }
  return (
    <>
      <Button
        color="info"
        variant="contained"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
}
