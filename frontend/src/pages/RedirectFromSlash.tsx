import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const RedirectFromSlash = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsAuthenticated(false);
            navigate("/signin");
            return;
        }

        try {
            const tokenParts = token.split(".");
            if (tokenParts.length !== 3) throw new Error("Invalid token format");

            const decodedToken = JSON.parse(atob(tokenParts[1]));

            if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
                setIsAuthenticated(true);
                navigate("/dashboard");
            } else {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
                navigate("/signin");
            }
        } catch (err) {
            console.error("Token decoding error:", err);
            setIsAuthenticated(false);
            localStorage.removeItem("token");
            navigate("/signin");
        }
    }, [navigate]); // Include navigate in the dependency array

    return null;
};
