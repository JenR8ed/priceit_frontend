import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
export function Logout() {
  const token = localStorage.getItem("access_token");
  const [cookie, setCookie, removeCookie] = useCookies(["logged_in"]);
  function handleLogout() {
    // removeCookie("logged_in");
    localStorage.clear()
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
