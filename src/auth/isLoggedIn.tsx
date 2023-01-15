import { useEffect } from "react";
import { useUser } from "./useUser";
import * as React from "react";

interface Element{
    Element: () => JSX.Element
}

const useAuth = (data: any) => {
    const token = localStorage.getItem("access_token");
    if (!data) {
        return false;
    } else if (data.sub.role === "user" && token) {
        return true;
    }
};

export const isLoggedIn = (FirstElement: any, SecondElement: any) => {
    const data = useUser();
    const auth = useAuth(data);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            // Validate token and refresh if needed
            // ...
        }
    }, []);

    return auth ? <FirstElement /> : <SecondElement />;
}