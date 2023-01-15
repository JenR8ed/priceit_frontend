import { useCookies } from "react-cookie";
import { useUser } from "./useUser";
import * as React from "react";

interface Element{
    Element: () => JSX.Element
}
const useAuth = (data: any, cookie: { logged_in?: any }) => {
  if (!data) {
    return false;
  } else if (data.sub.role === "user" && cookie.logged_in ) {
    return true;
  }
};
export const isLoggedIn = (FirstElement:any, SecondElement: any) =>{
  const [cookie] = useCookies(["logged_in"]);
  const data = useUser();
  const auth = useAuth(data, cookie);

  return auth ? <FirstElement /> : <SecondElement />;
}
