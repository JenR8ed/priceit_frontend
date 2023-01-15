import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "./useUser";


const useAuth = (data: any) => {
    const token = localStorage.getItem("access_token");
    if (!data) {
        return false;
    } else if (data.sub.role === "user" && token) {
        return true;
    }
};

const ProtectedRoute = (props: any) => {
    const data = useUser();
    const auth = useAuth(data);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            // Validate token and refresh if needed
            // ...
        }
    }, []);

    return auth ? <Outlet context={data.sub} /> : <Navigate to="/" />;
};

export default ProtectedRoute;