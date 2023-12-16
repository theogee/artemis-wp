import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export default function LandingPage() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/login", { replace: true });
        }
    }, [navigate, location.pathname]);
}
