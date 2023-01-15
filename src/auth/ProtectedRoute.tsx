import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./useUser";
import { useCookies } from "react-cookie";


const useAuth = (data: any, cookie: { logged_in?: any }) => {
  if (!data) {
    return false;
  } else if (data.sub.role === "user" && cookie.logged_in) {
    return true;
  }
};

const ProtectedRoute = (props: any) => {
  const [cookie, ] = useCookies(["logged_in"]);
  const data = useUser();
  const auth = useAuth(data, cookie);
  return auth ? <Outlet context={data.sub} /> : <Navigate to="/" />;
};


export default ProtectedRoute;
